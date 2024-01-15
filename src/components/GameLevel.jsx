import styles from "./GameLevel.module.css";

function GameLevel({ solutionsArray, userSubmitedWords, showWordsLeft }) {
  // create an array of all the words that are still the solution, but the player has not yet entered
  const wordsLeft = solutionsArray.filter(
    (word) => !userSubmitedWords.includes(word)
  );
  console.log(wordsLeft);

  //create an array of 100 elements with value 0. This array serves as counter for how many words have how many letters
  let countArray = new Array(100).fill(0);
  for (const word of wordsLeft) {
    countArray[word.length]++;
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
  // const renderWordCounts = countArray.map((count, index) => {
  //   return <div key={index}>{count}</div>;
  // });

  return (
    <div className={styles.container}>
      {/* <span className={styles.progressText}>
        <b>10x</b> <br></br>4 črke
      </span>
      <span className={styles.progressText}>
        <b>5x</b> <br></br>5 črk
      </span>
      <span className={styles.progressText}>
        <b>3x</b> <br></br>6 črk
      </span>
      <span className={styles.progressText}>
        <b>2x</b> <br></br>7 črk
      </span>
      <span className={styles.progressText}>
        <b>1x</b> <br></br>8 črk
      </span> */}
      {/* {showWordsLeft} && {renderWordCounts} */}
      {showWordsLeft ? renderWordCounts : null}
      {/* <div className={styles.progressText}>
        <strong className={styles.progressTitle}>Beginner</strong>
        <br></br>
        <span className={styles.nextWrapper}>
          <b>
            <span className={styles.pointsToNext}>8 </span>
          </b>
          to
          <span className={styles.nextTitle}> Novice</span>
        </span>
      </div>
      <div className={styles.progressLine}></div> */}
    </div>
  );
}

export default GameLevel;
