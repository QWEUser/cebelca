import styles from "./GameWordsLeft.module.css";

function GameWordsLeft({ solutionsArray, userSubmitedWords }) {
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
          <b>{count}&times;</b> <br></br>
          {index} {index === 4 ? "črke" : "črk"}
        </span>
      );
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.jarContainer}>
        <div className={styles.jarCounter}>&times;</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 77.212005 99.999781"
          xmlSpace="preserve"
          width="77.212006"
          height="99.999786"
        >
          <g id="Layer_2" transform="translate(-396.859,-248.40486)">
            <path
              className={styles.st5}
              d="m 399.11804,278.88153 v 54.96249 c 0,8.00523 6.77302,12.16186 13.162,12.26865 0.0493,0 49.50177,0.0329 48.23055,0.0329 4.70907,0 11.30137,-4.32914 11.30137,-12.2707 v -54.99946 c 0,-1.37596 -0.47029,-2.7088 -1.33078,-3.78081 l -11.94828,-14.117 c 2.73755,-0.11501 5.00275,-3.00453 4.89801,-5.63529 -0.0986,-2.4911 -2.16662,-4.57353 -4.75631,-4.67827 -15.16228,0.0472 -30.32661,0.0945 -45.48889,0.14171 -2.84844,-0.0575 -5.18758,2.04546 -5.44634,4.53656 -0.29368,2.83818 2.16457,5.65788 5.44634,5.63529 -4.21825,4.7255 -8.43649,9.45101 -12.65474,14.17651 -0.91183,1.02889 -1.41293,2.35557 -1.41293,3.72742 z"
              id="path3780"
            />
            <line
              className={styles.st6}
              x1="413.18365"
              y1="259.95282"
              x2="459.1264"
              y2="259.95282"
              id="line3782"
            />
            <path
              className={styles.st7}
              d="m 416.11831,267.77722 -9.41401,10.63177 c -2.1e-4,10e-6 -0.002,0 -0.002,0 v 0.002 42.10834 7.09561 c 0,7.38912 5.45852,11.01391 10.42841,10.98515 0.0431,0 39.22314,0.0285 38.21479,0.0285 4.52014,-0.20536 8.95394,-3.62473 8.95394,-10.98716 V 278.4066 c 8.2e-4,-4e-5 0.002,3e-5 0.002,0 l -9.3013,-10.62977 z"
              id="path3784"
            />
          </g>
        </svg>
      </div>
      <h1>Preostale besede</h1>
      <div>{renderWordCounts}</div>
    </div>
  );
}

export default GameWordsLeft;
