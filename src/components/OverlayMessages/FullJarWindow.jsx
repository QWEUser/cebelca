import styles from "./FullJarWindow.module.css";
import GameOverPrompt from "./GameOverPrompt";

function FullJarWindow({ dispatch }) {
  return (
    <div className={styles.container}>
      <h1>Kozarec napolnjen!</h1>
      <p>
        Bravo, kozarec je poln medu! Želiš nadaljevati igro in napolniti še več
        kozarcev medu, ali želiš igro zaključiti?
      </p>
      <GameOverPrompt dispatch={dispatch} />
      {/* <div className={styles.buttonContainer}>
        <button onClick={() => dispatch({ type: "closeOverlay" })}>
          Nadaljuj
        </button>
        <button onClick={() => dispatch({ type: "gameOver" })}>Končaj</button>
      </div> */}
    </div>
  );
}

export default FullJarWindow;
