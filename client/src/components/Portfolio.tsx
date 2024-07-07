// import styles from "./styles/Portfolio.module.css";
// import { useEffect } from "react";
import Project from "./Project";

import webThereminDesktop from "../../public/WebTheremin.png";
import fabricDesktop from "../../public/fabric-img.png";

// import insureDesktop from "./mockimage.jpg";
// import fyloDesktop from "./mockimage.jpg";

export default function Portfolio(): JSX.Element {
  // useEffect(() => {
  //   document.title = "Minimalist Portfolio | My Projects";
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    // <main className={styles.main}>
    <>
      <Project.Right
        title="Web Theremin"
        description="
        A web browser instrument using hand recognition algorithm. 
      You can start playing sound by touching your thumb with your index finger, and move
      youre hand up and down in order to control the instrument's pitch.
        "
        screenshots={webThereminDesktop}
        link="https://royglick.github.io/web-theremin/"
      />
      <Project.Left
        title="Ideal Fabric"
        description="
        Expiremanting with toxiclibs physics engine library. It's a grid of springs connected
        to each other, creating a simulation of an ideal fabric with no friction or 
        inner collisions. The user can control several parameters such as gravity, spring's strength,
        and ocillations in order to create different patterns."
        screenshots={fabricDesktop}
        link="https://royglick.github.io/p5js-cloth-simulation/"
      />
    </>
    // </main>
  );
}
