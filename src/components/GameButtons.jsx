import styles from "./GameButtons.module.css";
import DeleteButton from "./DeleteButton";

function GameButtons({ inputWord, dispatch }) {
  return (
    <div className={styles.gameButtons}>
      {/* <button onClick={() => dispatch({ type: "deleteLastLetter" })}>
        Briši
      </button> */}
      <DeleteButton dispatch={dispatch} />
      <button onClick={() => dispatch({ type: "shuffleGameLetters" })}>
        <svg
          className="shuffle-icon"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.19306266,7 L10,7 L10,9 L3,9 L3,2 L5,2 L5,5.27034886 C6.72510698,3.18251178 9.19576641,2 12,2 C17.5228475,2 22,6.4771525 22,12 C20,12 22,12 20,12 C20,7.581722 16.418278,4 12,4 C9.60637619,4 7.55353989,5.07869636 6.19306266,7 Z M17.8069373,17 L14,17 L14,15 L21,15 L21,22 L19,22 L19,18.7296511 C17.274893,20.8174882 14.8042336,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,12 4,12 4,12 C4,16.418278 7.581722,20 12,20 C14.3936238,20 16.4464601,18.9213036 17.8069373,17 Z"
            // fillRule="evenodd"
            fill="var(--fill-color-primary)"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => dispatch({ type: "userSubmitWord", payload: inputWord })}
      >
        Vnesi
      </button>
    </div>
  );
}

export default GameButtons;
