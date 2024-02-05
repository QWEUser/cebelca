import styles from "./GameLevel.module.css";
import ScoreJar from "./ScoreJar";

function GameLevel({
  userCurrentScore,
  totalScore,
  solutionsArray,
  userSubmitedWords,
  showWordsLeft,
  dispatch,
}) {
  // determine the socre needed to fill one jar
  const jarScore = Math.floor(totalScore / 4);

  // create an array of all the words that are still the solution, but the player has not yet entered
  const wordsLeft = solutionsArray.filter(
    (word) => !userSubmitedWords.includes(word)
  );
  console.log(wordsLeft);

  // create an array of 100 elements with value 0. This array serves as counter for how many words have how many letters
  let countArray = new Array(100).fill(0);
  let score = 0;
  let countPangrams = 0;
  for (const word of wordsLeft) {
    countArray[word.length]++;
    score = score + word.length - 3;
    const wordUniqueLetters = Array.from(new Set([...word]));
    if (wordUniqueLetters.length == 7) {
      score = score + 7;
      countPangrams++;
      console.log(
        "pangram: " + word + " , number of pangrams found: " + countPangrams
      );
    }
  }

  // create an array of "circles" that will display how many words of number of letters are still left.
  const renderWordCounts = countArray.map((count, index) => {
    if (count !== 0) {
      return (
        <span className={styles.progressText} key={index}>
          <b>{count}x</b> <br></br>
          {index} {index === 4 ? "črke" : "črk"}
        </span>
      );
    }
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scoreJarContainer}>
        {userCurrentScore < jarScore ? (
          <ScoreJar
            userCurrentScore={userCurrentScore}
            jarScore={jarScore}
            dispatch={dispatch}
          />
        ) : (
          <h1 style={{ color: "black" }}>Bravo, zmagal si!</h1>
        )}
      </div>
      {/* <div
        className={styles.scoreContainer}
        onClick={() => dispatch({ type: "showWordsLeft" })}
      >
        {score}
      </div> */}
      <div className={styles.countContainer}>
        {showWordsLeft ? renderWordCounts : null}
      </div>
    </div>
  );
}

export default GameLevel;
