import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { Hammer } from "./animation-helpers/hammer";
import { SoftLetter } from "./animation-helpers/soft-letter";

const toxi = require("toxiclibsjs");

type Props = {
  height?: number;
  width?: number;
};
function scrollDown() {
  window.scrollTo({
    top: 800,
    behavior: "smooth",
  });
}

const P5LiquidWords: React.FC<Props> = ({ height = 400, width = 400 }) => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let word = "HI";
    let word2 = "THERE";
    let hammer: Hammer;
    let font: p5.Font;
    let _letters: SoftLetter[] = [];
    let physics: any;
    let dragging = false;
    let button: p5.Element;

    const sketch = (p: p5) => {
      p.preload = () => {
        font = p.loadFont("/Venicelacorla-8M0Zz.otf");
      };

      p.setup = () => {
        if (!font || !canvasContainer.current) return;
        p.createCanvas(width, height);
        // p.createCanvas(width, height).parent("p5div");
        physics = new toxi.physics2d.VerletPhysics2D();
        // add gravity handler
        // const gravity = new toxi.geom.Vec2D(0, 0.11);
        // const gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
        // physics.addBehavior(gb);

        physics.setWorldBounds(
          new toxi.geom.Rect(40, 40, width - 80, height - 80)
        );
        hammer = new Hammer({
          x: 90,
          y: 200,
          r: 40,
          p5: p,
          physics,
        });

        physics.addBehavior(
          new toxi.physics2d.behaviors.AttractionBehavior(hammer, 80, -2, -0.03)
        );
        let fontSize = 400;
        p.textSize(fontSize);
        let x = 70;
        for (let char of word) {
          let letter = new SoftLetter({
            font: font,
            fontSize,
            char,
            x: x,
            y: 350,
            p5: p,
            physics: physics,
          });
          _letters.push(letter);
          x += p.textWidth(char);
        }
        x = 70;
        for (let char of word2) {
          let letter = new SoftLetter({
            font: font,
            fontSize,
            char,
            x: x,
            y: 680,
            p5: p,
            physics: physics,
          });
          _letters.push(letter);
          if (char == "R" || char == "E") {
            x += 220;
          } else {
            x += p.textWidth(char);
          }
        }

        button = p.createImg("./public/down-arrow.svg", "Scroll Down");
        button.size(80, 50);
        button.position(1300, 670);
        button.mousePressed(scrollDown);
        button.style("cursor", "pointer");
      };

      p.draw = () => {
        if (!physics || !hammer) return;
        p.background(255);
        physics.update();

        for (let letter of _letters) {
          letter.display();
          letter.returnToInitialPositions();
        }
        if (dragging) {
          hammer.x = p.mouseX;
          hammer.y = p.mouseY;
        }

        hammer.show();
      };

      p.mousePressed = () => {
        if (p.dist(hammer.x, hammer.y, p.mouseX, p.mouseY) < hammer.r) {
          dragging = true;
        }
      };
      p.mouseReleased = () => {
        dragging = false;
      };
    };

    const p5Instance = new p5(
      sketch,
      document.getElementById("p5liquidiv") || undefined
    );

    // Cleanup on component unmount
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasContainer}></div>;
};

export default P5LiquidWords;
