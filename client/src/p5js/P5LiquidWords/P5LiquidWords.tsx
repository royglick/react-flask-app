import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { Hammer } from "./animation-helpers/hammer";
import { SoftLetter } from "./animation-helpers/soft-letter";

const toxi = require("toxiclibsjs");

type Props = {
  height?: number;
  width?: number;
  word: string;
};
const P5LiquidWords: React.FC<Props> = ({
  height = 400,
  width = 400,
  word,
}) => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hammer: Hammer;
    let font: p5.Font;
    let _letters: SoftLetter[] = [];
    let physics: any;

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
        // const gravity = new toxi.geom.Vec2D(0, 1);
        // const  gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
        // physics.addBehavior(gb);
        physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));
        hammer = new Hammer({
          x: p.mouseX,
          y: p.mouseY,
          r: 40,
          p5: p,
          physics,
        });
        physics.addBehavior(
          new toxi.physics2d.behaviors.AttractionBehavior(hammer, 80, -6, 0.1)
        );
        let fontSize = 100 + width / word.length;
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
      };

      p.draw = () => {
        if (!physics || !hammer) return;
        p.background(255);
        physics.update();

        for (let letter of _letters) {
          letter.display();
          letter.returnToInitialPositions();
        }

        hammer.show();
        hammer.lock();
      };

      p.mouseMoved = () => {
        hammer && hammer.set(p.mouseX, p.mouseY);
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
  // return;
};

export default P5LiquidWords;
