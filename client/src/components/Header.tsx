import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        {/* <div style={{ cursor: "pointer" }}>
        </div> */}
        <nav id="topnav" className={styles.nav}>
          <Link to="/" className={styles.item}>
            HOME
          </Link>
          <Link to="/" className={styles.item}>
            PORTFOLIO
          </Link>
          <Link to="/" className={styles.item}>
            CONTACT ME
          </Link>
        </nav>
      </div>
    </header>
  );
}
