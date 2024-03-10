import styles from "./Intro.module.css";
import BeeIcon from "./NavbarIcons/BeeIcon";

function Intro({ dispatch }) {
  return (
    <div className={styles.container}>
      <div className={styles.beeContainer}>
        <BeeIcon />
      </div>
      <h1>
        č
        <span
          style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
        >
          &apos;
        </span>
        belica
      </h1>
      <button
        onClick={() =>
          dispatch({ type: "openOverlay", payload: "instructions" })
        }
      >
        Kako igrati?
      </button>
      <button
        style={{
          backgroundColor: "var(--background-color-secondary)",
        }}
        onClick={() => dispatch({ type: "closeIntro" })}
      >
        Igraj!
      </button>
    </div>
  );
}

export default Intro;
