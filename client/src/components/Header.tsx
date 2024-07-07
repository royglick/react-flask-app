import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";
import github from "../../public/github.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";
import axios from "axios";

export default function Header(): JSX.Element {
  const downloadResume = () => {
    const pdfUrl = axios.defaults.baseURL + "/download/Roy_Glick.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Roy_Glick.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <nav id="topnav" className={styles.nav}>
          <Link to="/" className={styles.item}>
            HOME
          </Link>
          <Link to="/" className={styles.item} onClick={downloadResume}>
            DOWNLOAD RESUME
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
