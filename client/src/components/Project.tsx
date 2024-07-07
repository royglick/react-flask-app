import SecondaryButton from "../components/SecondaryButton";
import styles from "./styles/Project.module.css";

interface ProjectProps {
  title: string;
  description: string;
  screenshots: string;
  link: string;
}

const Project = {
  Right: function RightProject({
    title,
    description,
    screenshots,
    link,
  }: ProjectProps): JSX.Element {
    return (
      <section className={styles.section}>
        <div className={`container ${styles.container}`}>
          <picture className={styles.imageContainer}>
            <img src={screenshots} alt={`${title} project screenshot`} />
          </picture>
          <div className={styles.boxContainer}>
            <h2 className="h2" style={{ marginBottom: "24px" }}>
              {title}
            </h2>
            <p
              className={`body-1 ${styles.text}`}
              style={{
                mixBlendMode: "normal",
                opacity: "0.8",
                textAlign: "left",
              }}
            >
              {description}
            </p>
            <SecondaryButton text="view project" href={link} />
          </div>
        </div>
      </section>
    );
  },

  Left: function LeftProject({
    title,
    description,
    screenshots,
    link,
  }: ProjectProps): JSX.Element {
    return (
      <section className={styles.section}>
        <div className={`container ${styles.containerInverted}`}>
          {/* <video width="320" height="240" autoplay loop muted>
          <source src="movie.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video> */}
          <picture className={styles.imageContainerInverted}>
            <img src={screenshots} alt={`${title} project screenshot`} />
          </picture>
          <div className={styles.boxContainerInverted}>
            <h2 className="h2" style={{ marginBottom: "24px" }}>
              {title}
            </h2>
            <p
              className={`body-1 ${styles.text}`}
              style={{
                mixBlendMode: "normal",
                opacity: "0.8",
                textAlign: "left",
              }}
            >
              {description}
            </p>
            <SecondaryButton text="view project" href={link} />
          </div>
        </div>
      </section>
    );
  },
};

export default Project;
