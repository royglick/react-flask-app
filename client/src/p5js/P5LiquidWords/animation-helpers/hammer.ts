import p5 from "p5";
const toxi = require("toxiclibsjs");

type Props = {
  p5: p5;
  x: unknown;
  y: unknown;
  r: unknown;
  physics: any;
};
export class Hammer extends toxi.physics2d.VerletParticle2D {
  constructor({ x, y, r, p5, physics }: Props) {
    super(x, y);
    this.r = r;
    this.connections = [];
    this.p5 = p5;
    this.addVelocity(p5.createVector(6, 0));
    physics.addParticle(this);
  }
  // attach(s) {

  show() {
    // this.p5.noFill();
    // this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.r * 2);

    let chars = " DRAG ME AROUND";

    this.p5.textSize(10);
    this.p5.fill("white");

    this.p5.push();

    // Let's first move to the center of the circle
    this.p5.translate(this.x, this.y);

    // Decide an angle
    let charSpacingAngleDeg = 25;

    // First rotate half back so that middle char will come in the center
    this.p5.rotate(this.p5.radians((-chars.length * charSpacingAngleDeg) / 3));

    for (let i = 0; i < chars.length; i++) {
      let r: number;
      if (
        this.p5.mouseIsPressed &&
        this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) < this.r
      ) {
        r = -this.r / 1.8 + this.p5.sin(this.p5.frameCount * 0.1 - i) * 5;
      } else {
        r = -this.r / 1.8;
      }
      this.p5.text(chars[i], 0, r);

      // Then keep rotating forward per character
      this.p5.rotate(this.p5.radians(charSpacingAngleDeg));
    }

    // Reset all translations we did since the last push() call
    // so anything we draw after this isn't affected
    this.p5.pop();
  }
}
