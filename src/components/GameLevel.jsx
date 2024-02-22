import styles from "./GameLevel.module.css";
import ScoreJar from "./ScoreJar";

function GameLevel({
  userTotalScore,
  userCurrentScore,
  userPrevScore,
  jarsFilledHistory,
  oneJarScore,
  dispatch,
}) {
  //TODO: this component can now be completely removed, inser <JarScore> directly in App.jsx

  // determine the score needed to fill one jar
  // const jarScore = Math.floor(totalScore / 4);

  // // create an array of all the words that are still the solution, but the player has not yet entered
  // const wordsLeft = solutionsArray.filter(
  //   (word) => !userSubmitedWords.includes(word)
  // );
  // console.log(wordsLeft);

  // // create an array of 100 elements with value 0. This array serves as counter for how many words have how many letters
  // let countArray = new Array(100).fill(0);
  // let score = 0;
  // let countPangrams = 0;
  // for (const word of wordsLeft) {
  //   countArray[word.length]++;
  //   score = score + word.length - 3;
  //   const wordUniqueLetters = Array.from(new Set([...word]));
  //   if (wordUniqueLetters.length == 7) {
  //     score = score + 7;
  //     countPangrams++;
  //     console.log(
  //       "pangram: " + word + " , number of pangrams found: " + countPangrams
  //     );
  //   }
  // }

  // // create an array of "circles" that will display how many words of number of letters are still left.
  // const renderWordCounts = countArray.map((count, index) => {
  //   if (count !== 0) {
  //     return (
  //       <span className={styles.progressText} key={index}>
  //         <b>{count}x</b> <br></br>
  //         {index} {index === 4 ? "črke" : "črk"}
  //       </span>
  //     );
  //   }
  // });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scoreJarContainer}>
        {/* {userCurrentScore < jarScore ? ( */}
        <ScoreJar
          userTotalScore={userTotalScore}
          userCurrentScore={userCurrentScore}
          userPrevScore={userPrevScore}
          jarsFilledHistory={jarsFilledHistory}
          oneJarScore={oneJarScore}
          // jarScore={jarScore}
          dispatch={dispatch}
        />
        {/* ) : (
          <h1 style={{ color: "black" }}>Bravo, kozarec je poln!</h1>
        )} */}
      </div>
    </div>
  );
}

export default GameLevel;
