import React from "react"
import {sketch} from 'p5'
import toxi from 'toxiclibsjs'

type Props = {
}

type State ={
  canvas: React.RefObject<unknown>;
}

class P5Wrapper extends React.Component<Props, State> {
  state: Readonly<State> = {
    canvas: React.createRef()
  };
  constructor(props: Props) {
    super(props)
  }


  Sketch = (p) => {

    function createParticle(x, y, r) {
      let particle = new toxi.physics2d.VerletParticle2D(new toxi.geom.Vec2D(x, y));
      physics.addParticle(particle);
      return particle;
    }
    
    function createSpring(p1, p2, length, strength) {
      let spring = new toxi.physics2d.VerletSpring2D(p1, p2, length, strength || 0.01);
      physics.addSpring(spring);
      return spring;
    }

    class SoftLetter {
      constructor(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.particles = [];
        this.springs = [];
        this.initialPositions = [];
        this.initBodies();
      }
    
      initBodies() {
        let path = font.textToPoints(this.char, this.x, this.y, fontSize, {
          sampleFactor: 0.7,
        });
    
        for (let pt of path) {
          let particle = createParticle(pt.x, pt.y, 5);
          this.particles.push(particle);
          this.initialPositions.push({ x: pt.x, y: pt.y });
        }
    
        for (let i = 0; i < this.particles.length - 1; i++) {
          let spring = createSpring(this.particles[i], this.particles[i + 1], 1);
          this.springs.push(spring);
        }
    
        let closingSpring = createSpring(this.particles[this.particles.length - 1], this.particles[0], 1);
        this.springs.push(closingSpring);
      }
    
      returnToInitialPositions() {
        for (let i = 0; i < this.particles.length; i++) {
          let particle = this.particles[i];
          let initialPosition = this.initialPositions[i];
          let dx = initialPosition.x - particle.x;
          let dy = initialPosition.y - particle.y;
          let distance = sqrt(dx * dx + dy * dy);
          let forceMagnitude = letterForce * distance;
          let force = new toxi.geom.Vec2D(dx * forceMagnitude, dy * forceMagnitude);
          particle.addForce(force);
        }
      }
    
      display() {
        fill(0);
        beginShape();
        for (let particle of this.particles) {
          vertex(particle.x, particle.y);
        }
        endShape(CLOSE);
      }
    }
    

    class Hammer extends toxi.physics2d.VerletParticle2D {
      constructor(x, y, r) {
        super(x, y);
        this.r = r;
        this.connections = [];
        physics.addParticle(this);
      }
      attach(s) {
          this.connections.push(s); 
        }
    
      show() {
        noFill()
        noStroke()
        circle(this.x, this.y, this.r * 2);
      }
      
    }

    let world;
    let word1 = "LIQUID";
    let word2 = "DEATH";
    let word3 = "SOUL";
    let word4 = "NOVA";
    let letters = [];
    let fontSize = 300;
    let font;
    let canvas;
    let gravity;
    let letterForce = 0.005;

     p.setup = () => {
     canvas = sketch.createCanvas(windowWidth, windowHeight);
  
     // Initialize Toxiclibs physics world with gravity
     gravity = new toxi.geom.Vec2D(0, 1);
     physics = new toxi.physics2d.VerletPhysics2D();
     gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
     // physics.addBehavior(gb);
     physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));
     hammer = new Hammer(mouseX, mouseY, 40);
     physics.addBehavior(new toxi.physics2d.behaviors.AttractionBehavior(hammer, 80, -6, 0.1))
     
     textSize(fontSize);
     let x = 140;
     for (let char of word1) {
       let letter = new SoftLetter(char, x, height / 3 +60);
       letters.push(letter);
       x += textWidth(char) + 30;
     }
   
     x = 140;
   
     for (let char of word3) {
       let letter = new SoftLetter(char, x , height / 2 +260);
       letters.push(letter);
       x += textWidth(char) + 30;
     }
     }

     p.draw = () => {
     ...
     }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
    return (
      <div ref={this.myRef}>

      </div>
    )
  }
}