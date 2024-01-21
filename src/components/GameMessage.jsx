import styles from "./GameMessage.module.css";

function GameMessage({ lastSubmitedWord }) {
  // derived state; calculate the score of last user word input
  const wordUniqueLetters = lastSubmitedWord
    ? Array.from(new Set([...lastSubmitedWord]))
    : [];
  const isPangram = wordUniqueLetters.length == 7 ? true : false;
  let wordScore = isPangram
    ? lastSubmitedWord.length - 3 + 7
    : lastSubmitedWord.length - 3;

  return (
    // this game message is displayed only for a short time; key is added so component rerenders when lastSubmitedWord changes
    wordScore > 0 ? (
      <div className={styles.container} key={lastSubmitedWord}>
        <p>{`Bravo! +${wordScore}`}</p>
      </div>
    ) : (
      // if wordScore is less than 0, display an empty div
      <div
        className={`${styles.container} ${styles.disabled}`}
        key={lastSubmitedWord}
      ></div>
    )
  );
}

export default GameMessage;
