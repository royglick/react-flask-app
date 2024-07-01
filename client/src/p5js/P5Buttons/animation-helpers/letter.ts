import p5, { Vector } from "p5";

type LetterProps = {
  letter: string;
  initialx: number;
  initialy: number;
  finalx: number;
  finaly: number;
  p5: p5;
  vec: Vector;
};
export default class Letter {
  letter: string;
  initialx: number;
  initialy: number;
  finalx: number;
  finaly: number;
  x: number;
  y: number;
  vec: Vector;
  p5: p5;

  constructor({
    initialx,
    initialy,
    finalx,
    finaly,
    letter,
    vec,
    p5,
  }: LetterProps) {
    this.x = initialx;
    this.y = initialy;
    this.letter = letter;
    this.initialx = initialx;
    this.initialy = initialy;
    this.vec = vec;
    this.p5 = p5;
    this.finalx = finalx;
    this.finaly = finaly;
  }

  show() {
    let d = this.p5.dist(
      this.initialx,
      this.initialy,
      this.p5.mouseX,
      this.p5.mouseY
    );
    if (d < 200) {
      this.x = this.p5.lerp(this.x, this.finalx, 0.1);
      this.y = this.p5.lerp(this.y, this.finaly, 0.1);
    } else {
      this.x = this.p5.lerp(this.x, this.initialx, 0.1);
      this.y = this.p5.lerp(this.y, this.initialy, 0.1);
    }
    this.p5.fill(0);
    this.p5.text(this.letter, this.x, this.y);
  }
}
