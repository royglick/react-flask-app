import React, { useRef, useEffect } from "react";
import p5 from "p5";
import Letter from "./animation-helpers/letter.ts";

type P5ParagraphProps = {
  height?: number;
  width?: number;
};
const P5Paragraph: React.FC<P5ParagraphProps> = ({
  height = 400,
  width = 400,
}) => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let first_sentence = "Hi! I'm Roy Glick,";
      let second_sentence = "I'm a software developer, a musician, ";
      let third_sentence = "and a creative coding enthusiast.";
      let fourth_sentence = "Scroll down to see some projects i've made. ✨";
      let fontSize = 30;
      let letters: Letter[] = [];

      function buildSentence(x: number, y: number, sentence: string) {
        for (let letter of sentence) {
          let angle = p.random(p.TWO_PI);
          let vec = p5.Vector.fromAngle(angle).mult(60);
          letters.push(
            new Letter({
              initialx: x + vec.x,
              initialy: y + vec.y,
              finalx: x,
              finaly: y,
              letter,
              vec: vec,
              p5: p,
            })
          );
          x += p.textWidth(letter);
        }
      }

      p.preload = () => {};

      p.setup = () => {
        if (!canvasContainer.current) return;
        p.createCanvas(width, height);
        p.background(255);
        // p.textFont("Helvetica");
        p.textFont("Georgia");
        p.textSize(fontSize);

        buildSentence(130, 80, first_sentence);
        buildSentence(130, 130, second_sentence);
        buildSentence(130, 180, third_sentence);
        buildSentence(630, 300, fourth_sentence);
      };

      p.draw = () => {
        p.background(255);
        for (let letter of letters) {
          letter.show();
        }
      };
    };

    const p5Instance = new p5(
      sketch,
      document.getElementById("p5sentencediv") || undefined
    );

    // Cleanup on component unmount
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasContainer}></div>;
};

export default P5Paragraph;
