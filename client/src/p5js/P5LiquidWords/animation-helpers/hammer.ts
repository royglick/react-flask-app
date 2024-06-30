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
  //     this.connections.push(s);
  //   }

  show() {
    this.p5.noFill();
    this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.r * 2);
  }
}
