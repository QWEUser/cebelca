import styles from "./GameOverPrompt.module.css";

function GameOverPrompt({ dispatch }) {
  return (
    <div className={styles.container}>
      <p>
        Ob zaključku igre se razkrijejo vse besede, ki so bile del igre. Ko
        trenutno igro končaš, je ne moreš več nadaljevati.
      </p>
      <div className={styles.buttonContainer}>
        <button onClick={() => dispatch({ type: "closeOverlay" })}>
          Nadaljuj
        </button>
        <button onClick={() => dispatch({ type: "gameOver" })}>Končaj</button>
      </div>
    </div>
  );
}

export default GameOverPrompt;
