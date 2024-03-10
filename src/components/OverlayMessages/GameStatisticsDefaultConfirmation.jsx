import styles from "./GameStatisticsDefaultConfirmation.module.css";

function GameStatisticsDefaultConfirmation({ dispatch }) {
  return (
    <div className={styles.container}>
      <p>Res želiš izbrisati statistiko na tej napravi?</p>
      <button onClick={() => dispatch({ type: "resetStatistics" })}>Da</button>
      <button
        onClick={() => dispatch({ type: "openOverlay", payload: "statistics" })}
      >
        Ne
      </button>
    </div>
  );
}

export default GameStatisticsDefaultConfirmation;
