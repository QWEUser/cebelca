import styles from "./FullJarWindow.module.css";

function FullJarWindow({ dispatch }) {
  return (
    <div className={styles.container}>
      <h1>Kozarec napolnjen!</h1>
      <p>
        Bravo, še en kozarec je poln medu! Želiš nadaljevati z igro in napolniti
        še več kozarcev medu, ali želiš zaključiti z igro? Ob zaključku igre se
        razkrijejo vse besede, ki niso bile najdene.
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

export default FullJarWindow;
