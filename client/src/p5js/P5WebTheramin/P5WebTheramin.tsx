import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "p5/lib/addons/p5.sound";
const ml5 = require("ml5");

type Props = {
  height?: number;
  width?: number;
};
const P5WebTheramin: React.FC<Props> = ({
  height = 400, //default sketch size
  width = 400, //default sketch size
}) => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  let handPose: any;
  let video: any;
  let hands: any[];
  let osc: any;
  // Callback function for when handPose outputs data
  function gotHands(results: any[]) {
    // save the output to the hands variable
    hands = results;
  }
  useEffect(() => {
    const sketch = (p: p5) => {
      p.preload = () => {
        handPose = ml5.handPose();
      };

      p.setup = () => {
        p.createCanvas(width, height);
        video = p.createCapture("video");
        video.size(width, height);
        video.hide();
        // start detecting hands from the webcam video
        handPose.detectStart(video, gotHands);

        // sound
        osc = new p5.Oscillator(); // set frequency and type
        osc.amp(0.5);

        // fft = new p5.FFT();
        osc.start();
      };

      p.draw = () => {
        // Draw the webcam video
        p.image(video, 0, 0, width, height);

        // Draw all the tracked hand points
        for (let i = 0; i < hands.length; i++) {
          let hand = hands[i];
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];
            p.fill(0, 255, 0);
            p.noStroke();
            p.circle(keypoint.x, keypoint.y, 10);
          }
        }
        // let handsObj = Object.keys(hands[0]);
        if (hands.length != 0) {
          console.log(hands[0]);
          p.userStartAudio();
          let freq = p.map(hands[0].index_finger_tip.y, 0, height, 920, 40);
          osc.freq(freq);
          let amp = p.map(hands[0].index_finger_tip.x, 0, width, 1, 0.01);
          osc.amp(amp);
        }
      };

      p.mouseMoved = () => {};
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
};

export default P5WebTheramin;
