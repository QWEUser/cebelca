import styles from "./GameSettings.module.css";

function GameSettings({ dispatch, darkMode }) {
  return (
    <div className={styles.container}>
      <h1>Nastavitve</h1>
      <input
        type="checkbox"
        id="check"
        onChange={() => dispatch({ type: "toggleDarkMode" })}
      />
      <label htmlFor="check">{darkMode ? "Svetli način" : "Temni Način"}</label>
    </div>
  );
}

export default GameSettings;
