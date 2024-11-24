import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import { fetchRedditPopularSubreddits } from "./apiService.ts";
import { Particle } from "./Particle.ts";
const toxi = require("toxiclibsjs");

type Props = {
  height?: number;
  width?: number;
};

const P5Reddit: React.FC<Props> = ({
  height = 900, //default sketch size
  width = 900, //default sketch size
}) => {
  const [redditData, setRedditData] = useState(null);
  const canvasContainer = useRef<HTMLDivElement>(null);
  let physics: any;
  let particles: Particle[] = [];

  useEffect(() => {
    const sketch = (p: p5) => {
      p.preload = async () => {
        const result = await fetchRedditPopularSubreddits();
        setRedditData(result);
        console.log(result);
      };

      p.setup = () => {
        p.createCanvas(width, height);
        physics = new toxi.physics2d.VerletPhysics2D();
        physics.setWorldBounds(
          new toxi.geom.Rect(40, 40, width - 80, height - 80)
        );
        particles.push(new Particle(20, 20, p, physics));
      };
      console.log(redditData);

      p.draw = () => {
        for (let particle of particles) {
          particle.show();
        }
      };

      p.mouseMoved = () => {};
    };

    const p5Instance = new p5(
      sketch,
      document.getElementById("p5reddit") || undefined
    );

    // Cleanup on component unmount
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasContainer}></div>;
};

export default P5Reddit;
