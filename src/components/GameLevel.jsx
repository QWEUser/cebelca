import styles from "./GameLevel.module.css";

function GameLevel() {
  return (
    <div className={styles.container}>
      <span className={styles.progressText}>
        <b>10x</b> <br></br>4 črke
      </span>
      <span className={styles.progressText}>
        <b>5x</b> <br></br>5 črk
      </span>
      <span className={styles.progressText}>
        <b>3x</b> <br></br>6 črk
      </span>
      <span className={styles.progressText}>
        <b>2x</b> <br></br>7 črk
      </span>
      <span className={styles.progressText}>
        <b>1x</b> <br></br>8 črk
      </span>
      {/* <div className={styles.progressText}>
        <strong className={styles.progressTitle}>Beginner</strong>
        <br></br>
        <span className={styles.nextWrapper}>
          <b>
            <span className={styles.pointsToNext}>8 </span>
          </b>
          to
          <span className={styles.nextTitle}> Novice</span>
        </span>
      </div>
      <div className={styles.progressLine}></div> */}
    </div>
  );
}

export default GameLevel;
