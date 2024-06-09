import styles from "./RandomGamePrompt.module.css";

function randomGamePrompt({ dispatch }) {
  return (
    <div className={styles.container}>
      <p>Želiš nadaljevati zadnjo igro ali začeti novo?</p>
      <button onClick={() => dispatch({ type: "continueRandomGame" })}>
        Nadaljuj
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "createNewGame",
            payload: { sourcePangram: "random" },
          })
        }
      >
        Začni novo
      </button>
    </div>
  );
}

export default randomGamePrompt;
