const toxi = require("toxiclibsjs");
import p5 from "p5";

export class Particle extends toxi.VerletParticle2D {
  p5: p5;
  physics: any;
  constructor(x: number, y: number, p5: p5, physics: any) {
    super(x, y);
    this.r = 20;
    this.p5 = p5;
    physics.addParticle(this);
  }

  show() {
    this.p5.fill(252, 238, 33);
    this.p5.strokeWeight(1);
    this.p5.circle(this.x, this.y, this.r * 12);
    this.p5.strokeWeight(this.r * 4);
    this.p5.point(this.x, this.y);
  }
}

type Location = {
  x: number;
  y: number;
};

export class Spring extends toxi.VerletSpring2D {
  constructor(a: Location, b: Location, p5: p5, physics: any) {
    let length = p5.dist(a.x, a.y, b.x, b.y);
    super(a, b, length * 1, 0.001);
    this.p5 = p5;
    physics.addSpring(this);
  }

  show() {
    this.p5.strokeWeight(1);
    this.p5.stroke(0, 127);
    this.p5.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
