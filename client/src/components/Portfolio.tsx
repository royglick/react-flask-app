// import styles from "./styles/Portfolio.module.css";
// import { useEffect } from "react";
import Project from "./Project";

import manageDesktop from "/Users/royglick/Project/react-flask-app/client/public/image-portfolio-bookmark.jpg";
// import bookmarkDesktop from "./mockimage.jpg";
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
        title="Manage"
        description="
        This project required me to build a fully responsive landing page to the designs provided. 
        I used HTML5, along with CSS Grid and JavaScript for the areas that required interactivity,
        such as the testimonial slider.
        "
        screenshots={manageDesktop}
        param="manage"
      />
      <Project.Left
        title="Bookmark"
        description="
        This project required me to build a fully responsive landing page to the designs provided.
        I used HTML5, along with CSS Grid and JavaScript for the areas that required interactivity,
        such as the features section."
        screenshots={manageDesktop}
        param="bookmark"
      />
    </>
    // </main>
  );
}
