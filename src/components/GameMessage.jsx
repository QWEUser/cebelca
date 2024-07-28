import styles from "./GameMessage.module.css";

function GameMessage({
  lastSubmitedWord,
  randomCongratulationsWord,
  wrongInputMessage,
  toggle,
}) {
  // derived state; calculate the score of last user word input
  const wordUniqueLetters = lastSubmitedWord
    ? Array.from(new Set([...lastSubmitedWord]))
    : [];
  const isPangram = wordUniqueLetters.length == 7 ? true : false;
  const wordScore = isPangram
    ? lastSubmitedWord.length - 3 + 7
    : lastSubmitedWord.length - 3;

  const congratulationsWord = isPangram ? (
    <span>
      Bu
      <span
        style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
      >
        č
      </span>
      ela!
    </span>
  ) : (
    // <span>
    //   Č
    //   <span
    //     style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
    //   >
    //     &apos;
    //   </span>
    //   belica!
    // </span>
    randomCongratulationsWord
  );

  return (
    // this game message is displayed only for a short time; key is added so component rerenders when lastSubmitedWord changes
    wrongInputMessage !== "" ? (
      <div className={`${styles.container} ${styles.error}`} key={toggle}>
        {wrongInputMessage}
      </div>
    ) : // if wordScore is less than 0, display an empty div
    wordScore > 0 ? (
      <div className={styles.container} key={lastSubmitedWord}>
        <p className={styles.congratulationsWord}>{congratulationsWord}</p>
        <div className={styles.wordScore}>{`+${wordScore}`}</div>
      </div>
    ) : (
      <div
        className={`${styles.container} ${styles.disabled}`}
        key={lastSubmitedWord}
      ></div>
    )

    // // this game message is displayed only for a short time; key is added so component rerenders when lastSubmitedWord changes
    // wordScore > 0 ? (
    //   <div className={styles.container} key={lastSubmitedWord}>
    //     <p className={styles.congratulationsWord}>{congratulationsWord}</p>
    //     <div className={styles.wordScore}>{`+${wordScore}`}</div>
    //   </div>
    // ) : // if wordScore is less than 0, display an empty div
    // wrongInputMessage === "" ? (
    //   <div
    //     className={`${styles.container} ${styles.disabled}`}
    //     key={lastSubmitedWord}
    //   ></div>
    // ) : (
    //   <div className={`${styles.container} ${styles.error}`} key={toggle}>
    //     {wrongInputMessage}
    //   </div>
    // )
  );
}

export default GameMessage;
