import styles from "./EndOfGame.module.css";
import BeeIcon from "./NavbarIcons/BeeIcon";

function EndOfGame({ solutionsArray, userSubmitedWords, dispatch }) {
  const allWordsFound =
    solutionsArray.length === userSubmitedWords.length ? true : false;

  const notFoundWords = solutionsArray.filter(
    (word) => !userSubmitedWords.includes(word)
  );

  const renderedUserSubmitedWords = userSubmitedWords
    .map((word, index) => {
      // display words in block elements with links
      let isPangram = false;
      const wordArray = Array.from(new Set([...word]));
      if (wordArray.length === 7) {
        isPangram = true;
      }
      return (
        <a
          key={index}
          href={`https://www.fran.si/iskanje?View=1&Query=${word}`}
          target={"_blank"}
          rel="noopener noreferrer"
          className={isPangram ? styles.pangram : ""}
        >
          {word}
        </a>
      );
    })
    .reverse();

  const renderedNotFoundWords = notFoundWords.map((word, index) => {
    // display words in block elements with links
    let isPangram = false;
    const wordArray = Array.from(new Set([...word]));
    if (wordArray.length === 7) {
      isPangram = true;
    }
    return (
      <a
        key={index}
        href={`https://www.fran.si/iskanje?View=1&Query=${word}`}
        target={"_blank"}
        rel="noopener noreferrer"
        className={isPangram ? styles.pangram : ""}
      >
        {word}
      </a>
    );
  });
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Zmaga!</h1>
        <BeeIcon dispatch={dispatch} />

        {allWordsFound && (
          <p>
            Bravo, našel si vse možne besede in z medom napolnil vse kozarce!
          </p>
        )}
        {!allWordsFound && (
          <div>
            <p>Najdene so bile sledeče besede: </p>
            <div className={styles.words}>{renderedUserSubmitedWords}</div>
            <p>Te besede pa niso bile najdene: </p>
            <div className={styles.words}>{renderedNotFoundWords}</div>
          </div>
        )}
        <button
          className={styles.newGameButton}
          // onClick={() => window.location.reload(false)}
          onClick={() => dispatch({ type: "showIntro" })}
        >
          Nova igra?
        </button>
      </div>
    </div>
  );
}

export default EndOfGame;
