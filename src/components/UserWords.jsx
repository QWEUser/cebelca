import styles from "./UserWords.module.css";

function UserWords({ userSubmitedWords, showUserWords, dispatch }) {
  // create an array of JSX elements with user words
  const renderedUserSubmitedWords = userSubmitedWords
    .map((word, index) => {
      let isPangram = false;
      const wordArray = Array.from(new Set([...word]));
      if (wordArray.length === 7) {
        isPangram = true;
      }
      // if user did not click "show all words" button, display single words in one line
      if (!showUserWords) {
        return (
          <span
            // className={styles.userWords__content__text__darker}
            // className={
            //   isPangram
            //     ? `${styles.userWords__content__text__darker} ${styles.pangram}`
            //     : styles.userWords__content__text__darker
            // }
            className={`${styles.userWords__content__text__darker} ${
              isPangram ? styles.pangram : ""
            }`}
            key={index}
          >
            {word}
          </span>
        );
      } else {
        // if user clicked on "show all words" button, display words in block elements with links
        return (
          <a
            // className={styles.userWords__content__blocks__block}
            className={`${styles.userWords__content__blocks__block} ${
              isPangram ? styles.pangram : ""
            }`}
            key={index}
            href={`https://www.fran.si/iskanje?View=1&Query=${word}`}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {word}
          </a>
        );
      }
    })
    .reverse();

  return (
    <button
      className={styles.userWords}
      onClick={() => dispatch({ type: "showUserWords" })}
    >
      <div className={styles.userWords__content}>
        {userSubmitedWords == "" ? (
          // if the user did not input any words yet, display this div
          <div className={styles.userWords__content__text}>
            Uporabljene besede ...
          </div>
        ) : (
          // otherwise, if user words exist, display this div
          <div
            className={
              // if user clicked on "show all words" button, render submited words in blocks, otherwise display a single line of words (default on page load)
              !showUserWords
                ? styles.userWords__content__text
                : styles.userWords__content__blocks
            }
          >
            {renderedUserSubmitedWords}
          </div>
        )}
        <svg
          className={styles.userWords__content__arr}
          width="13"
          height="8"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.8167 0.203007C14.5724 -0.0676691 14.1774 -0.0676691 13.933 0.203007L7.49998 7.32879L1.06699 0.203007C0.822632 -0.0676691 0.42763 -0.0676691 0.18327 0.203007C-0.06109 0.473683 -0.06109 0.911224 0.18327 1.1819L7.05814 8.79715C7.18001 8.93215 7.34 9 7.50001 9C7.66003 9 7.82002 8.93215 7.94189 8.79715L14.8168 1.1819C15.0611 0.911224 15.0611 0.473683 14.8167 0.203007Z"></path>
        </svg>
      </div>
    </button>
  );
}

export default UserWords;
