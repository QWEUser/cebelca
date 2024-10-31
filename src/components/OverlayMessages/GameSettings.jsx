import styles from "./GameSettings.module.css";

function GameSettings({ dispatch, darkMode }) {
  return (
    <div className={styles.container}>
      <h1>Nastavitve</h1>
      <div className={styles.inputContainer}>
        <input
          type="checkbox"
          id="check"
          onChange={() => dispatch({ type: "toggleDarkMode" })}
        />
        <label htmlFor="check">
          {darkMode ? "Svetli način" : "Temni način"}
        </label>
      </div>
    </div>
  );
}

export default GameSettings;
