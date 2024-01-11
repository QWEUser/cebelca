import styles from "./GameScore.module.css";

function GameScore({ dispatch }) {
  return (
    <div
      className={styles.container}
      onClick={() => dispatch({ type: "showWordsLeft" })}
    >
      78
    </div>
  );
}

export default GameScore;
