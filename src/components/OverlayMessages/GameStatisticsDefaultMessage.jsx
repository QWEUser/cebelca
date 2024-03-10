import styles from "./GameStatisticsDefaultMessage.module.css";

function GameStatisticsDefaultMessage({ dispatch }) {
  return (
    <div className={styles.container}>
      <p>Statistika je bila ponastavljena.</p>
      <button onClick={() => dispatch({ type: "closeOverlay" })}>Hvala</button>
    </div>
  );
}

export default GameStatisticsDefaultMessage;
