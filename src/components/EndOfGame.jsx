import styles from "./EndOfGame.module.css";
import BeeIcon from "./NavbarIcons/BeeIcon";

function EndOfGame() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Zmaga!</h1>
        <BeeIcon />
        <p>Bravo, našel si vse možne besede in z medom napolnil vse kozarce!</p>
        <button
          className={styles.newGameButton}
          onClick={() => window.location.reload(false)}
        >
          Nova igra?
        </button>
      </div>
    </div>
  );
}

export default EndOfGame;
