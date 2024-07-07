import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";
import github from "../../public/github.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <nav id="topnav" className={styles.nav}>
          <Link to="/" className={styles.item}>
            HOME
          </Link>
          <Link to="/" className={styles.item}>
            RESUME
          </Link>
          {/* <Link to="/" className={styles.item}>
            CONTACT ME
          </Link> */}
        </nav>
        <nav id="navicons" className={styles.navIcons}>
          <Link
            to="https://github.com/royglick"
            className={styles.headerIcons}
            target="_blank"
          >
            <img src={github} />
          </Link>

          <Link
            to="https://www.instagram.com/royglick/"
            className={styles.headerIcons}
            target="_blank"
          >
            <img src={instagram} />
          </Link>

          <Link
            to="https://www.linkedin.com/in/roy-glick-243b61100/"
            className={styles.headerIcons}
            target="_blank"
          >
            <img src={linkedin} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
