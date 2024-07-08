import p5 from "p5";
const toxi = require("toxiclibsjs");

type Props = {
  p5: p5;
  x: number;
  y: number;
  char: string;
  physics: any;
  font: p5.Font;
  fontSize: number;
};

type Location = Pick<Props, "x" | "y">;

export class SoftLetter {
  char: string;
  x: number;
  y: number;
  particles: any[];
  springs: unknown[];
  initialPositions: Location[];
  p5: p5;
  font: p5.Font;
  fontSize: number;
  letterForce: number;
  physics: any;

  constructor({ char, x, y, p5, physics, font, fontSize }: Props) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.particles = [];
    this.springs = [];
    this.initialPositions = [];
    this.font = font;
    this.p5 = p5;
    this.fontSize = fontSize;
    this.letterForce = 0.004; //0.004
    this.physics = physics;
    this.initBodies();
  }

  initBodies() {
    let path = this.font.textToPoints(
      this.char,
      this.x,
      this.y,
      this.fontSize,
      {
        sampleFactor: 0.6, //0.7
      }
    );

    for (let pt of path) {
      // let vec = p5.Vector.fromAngle(this.p5.random(this.p5.TWO_PI)).mult(2); // initial random position
      let particle = createParticle({
        x: pt.x,
        y: pt.y,
        physics: this.physics,
      });
      this.particles.push(particle);
      this.initialPositions.push({ x: pt.x, y: pt.y });
    }

    for (let i = 0; i < this.particles.length - 1; i++) {
      let spring = createSpring({
        p1: this.particles[i],
        p2: this.particles[i + 1],
        length: 1,
        physics: this.physics,
      });
      this.springs.push(spring);
    }

    let closingSpring = createSpring({
      p1: this.particles[this.particles.length - 1],
      p2: this.particles[0],
      length: 1,
      physics: this.physics,
    });
    this.springs.push(closingSpring);
  }

  returnToInitialPositions() {
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];
      let particleVec = new p5.Vector(particle.x, particle.y);
      let initialPositionVec = new p5.Vector(
        this.initialPositions[i].x,
        this.initialPositions[i].y
      );

      let desired = p5.Vector.sub(initialPositionVec, particleVec);
      let distance = this.p5.sqrt(
        desired.x * desired.x + desired.y * desired.y
      );

      let forceMagnitude = this.letterForce * distance;
      let force = new toxi.geom.Vec2D(
        desired.x * forceMagnitude,
        desired.y * forceMagnitude
      );
      particle.addForce(force);
    }
  }

  display() {
    this.p5.fill(0);
    this.p5.beginShape();
    for (let particle of this.particles) {
      this.p5.vertex(particle.x, particle.y);
    }
    this.p5.endShape(this.p5.CLOSE);
  }
}

type CreateParticleProps = Location & {
  physics: any;
};
const createParticle = ({ x, y, physics }: CreateParticleProps) => {
  let particle = new toxi.physics2d.VerletParticle2D(new toxi.geom.Vec2D(x, y));
  physics.addParticle(particle);
  return particle;
};

type CreateSpringsProp = {
  p1: unknown;
  p2: unknown;
  length: number;
  physics: any;
  strength?: number;
};
const createSpring = ({
  p1,
  p2,
  length,
  strength,
  physics,
}: CreateSpringsProp) => {
  let spring = new toxi.physics2d.VerletSpring2D(
    p1,
    p2,
    length,
    strength || 0.01
  );
  physics.addSpring(spring);
  return spring;
};
