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
    physics.addParticle(this);
  }
  // attach(s) {

  show() {
    // this.p5.noFill();
    // this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.r * 2);

    let chars = "THROW ME  AROUND";

    this.p5.textSize(10);
    this.p5.fill("white");

    this.p5.push();

    // Let's first move to the center of the circle
    this.p5.translate(this.x, this.y);

    // Decide an angle
    let charSpacingAngleDeg = 20;

    // First rotate half back so that middle char will come in the center
    this.p5.rotate(this.p5.radians((-chars.length * charSpacingAngleDeg) / 3));

    for (let i = 0; i < chars.length; i++) {
      this.p5.text(
        chars[i],
        0,
        -this.r / 1.8 + this.p5.sin(this.p5.frameCount * 0.1 - i) * 3
      );

      // Then keep rotating forward per character
      this.p5.rotate(this.p5.radians(charSpacingAngleDeg));
    }

    // Reset all translations we did since the last push() call
    // so anything we draw after this isn't affected
    this.p5.pop();
  }
}
