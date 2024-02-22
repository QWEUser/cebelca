import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import allWordsJSON from "../assets/words-data.json";
import GameButtons from "./GameButtons";
import GameLevel from "./GameLevel";
import GameMessage from "./GameMessage";
import HexagonGroup from "./HexagonGroup";
import InputWord from "./InputWord";
import UserWords from "./UserWords";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import EndOfGame from "./EndOfGame";

//TODO: get rid of words that contain letter w and y!!
//TODO: get rid of bad words (including "pedofil", "citroen"?, "engineering"?, "ziza")!!
//TODO: add inout word shake on wrong input -> add new variable isWordShaking and pass it down via useReducer to add or remove shake class

//TODO: add an OR operator to define hard coded input in case "allWordsJSON is unavailable"
const pangrams = allWordsJSON.pangrams.split(" ");
const notPangrams = allWordsJSON.notPangrams.split(" ");
const allWords = pangrams.concat(notPangrams).sort();

// randomly choose a pangram
const initialPangram = pangrams[Math.floor(Math.random() * pangrams.length)];

// pick a consonant from the word and make it the center letter
const pangramArray = [...initialPangram];
const vowelRegex = new RegExp(/[aeiou]/);
const pangramSetArray = Array.from(new Set(pangramArray));
const vowelFilteredPangram = pangramSetArray.filter(
  (letter) => !vowelRegex.test(letter)
);
const gameCenterLetter =
  vowelFilteredPangram[Math.floor(Math.random() * vowelFilteredPangram.length)];
console.log(initialPangram);

//create regex to check whether a letter is part of puzzle letters
const gameLettersRegex = new RegExp(`[${pangramSetArray.join("")}]`, "i");

// create a solutions array from all words
const containsCenterLetter = allWords.filter((word) =>
  word.includes(gameCenterLetter)
);
const solutionsArray = containsCenterLetter.filter((word) => {
  const wordArray = [...word];
  for (let i = 0; i < wordArray.length; i++) {
    if (!gameLettersRegex.test(wordArray[i])) {
      return false;
    }
    if (i === wordArray.length - 1) {
      return true;
    }
  }
});

// calculate total score possible

let totalScore = 0;
let countPangrams = 0;
for (const word of solutionsArray) {
  totalScore = totalScore + word.length - 3;
  const wordUniqueLetters = Array.from(new Set([...word]));
  if (wordUniqueLetters.length == 7) {
    totalScore = totalScore + 7;
    countPangrams++;
    console.log(
      "initial page load: pangram: " +
        word +
        " , number of pangrams found: " +
        countPangrams
    );
  }
}

console.log(solutionsArray);
console.log(totalScore);

// devide the totalScore to predetermined amount of jars and save the score to an array. For example, if totalScore = 101 and amountOfJars = 5, totalJarsScore should be [20,40,60,80,101] (all elements are rounded down, except the last element, which is orunded up)
const amountOfJars = 5;

const totalJarScoresArray = Array.from(
  { length: amountOfJars },
  (_e, index) => {
    if (index !== amountOfJars - 1) {
      return Math.floor(((index + 1) * totalScore) / amountOfJars);
    } else {
      return Math.ceil(((index + 1) * totalScore) / amountOfJars);
    }
  }
);

console.log(totalJarScoresArray);

// words that are displayed when user successfuly enters a new word
const congratulationsWords = [
  "Bravo!",
  "Odlično!",
  "Terna!",
  "Super!",
  "Obvladaš!",
  "Noro!",
  "Mojster!",
  "Skriti talent!",
  "Perfekcija!",
  "Genialno!",
  "Uau!",
];

// get history of number of jars filled on this device
// if (localStorage.getItem("jarsFilled") === null) {
//   localStorage.setItem("jarsFilled", 0);
// }

// useReducer logic

// reducer function initial state
const initialState = {
  gameLetters: pangramSetArray.filter((letter) => letter != gameCenterLetter),
  inputWord: "",
  isWordShaking: false,
  userSubmitedWords: [],
  // showWordsLeft: false,
  showUserWords: false,
  userCurrentScore: 0,
  userPrevScore: 0,
  userTotalScore: 0,
  oneJarScore: Math.floor(totalScore / amountOfJars),
  showOverlay: false,
  // toggle is used to force rerender a component -> its value changes between true and false, so the component using key={toggle} forcefully rerenders
  toggle: false,
  overlayText: "",
  randomCongratulationsWord:
    congratulationsWords[
      Math.floor(Math.random() * congratulationsWords.length)
    ],
  wrongInputMessage: "",
  // get history of number of jars filled on this device
  jarsFilledHistory:
    localStorage.getItem("jarsFilled") === null
      ? 0
      : Number(localStorage.getItem("jarsFilled")),
  endOfGame: false,
};

console.log("oneJarScore: " + initialState.oneJarScore);

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "shuffleGameLetters":
      // shuffle the gameLetters randomly
      return {
        ...state,
        gameLetters: state.gameLetters.sort(() => Math.random() - 0.5),
      };
    case "userInputWord":
      // update inputWord when a change happens in inputWord
      return {
        ...state,
        inputWord: state.inputWord + action.payload,
      };
    case "removeShake":
      // remove .shake class from component
      return {
        ...state,
        isWordShaking: false,
      };
    case "deleteLastLetter":
      // delete last letter in inputWord
      return {
        ...state,
        inputWord: state.inputWord.slice(0, -1),
      };
    case "userSubmitWord": {
      // check if user input word is valid and add it to userSubmitedWords
      if (
        solutionsArray.includes(state.inputWord) &&
        !state.userSubmitedWords.includes(state.inputWord)
      ) {
        const userWord = action.payload;
        let score = userWord.length - 3;
        const wordUniqueLetters = Array.from(new Set([...userWord]));
        if (wordUniqueLetters.length == 7) {
          score = score + 7;
        }

        const newScore = state.userCurrentScore + score;

        return {
          ...state,
          userSubmitedWords: [...state.userSubmitedWords, action.payload],
          inputWord: initialState.inputWord,
          isWordShaking: false,
          userCurrentScore:
            newScore >= state.oneJarScore
              ? newScore - state.oneJarScore
              : newScore,
          userPrevScore: state.userCurrentScore,
          //TODO: userTotalScore needs to be implemented!!
          userTotalScore: newScore,
          oneJarScore:
            // state.userTotalScore is reading the previous state, so we need to add newScore
            state.userTotalScore + newScore <
            (totalScore * (amountOfJars - 1)) / amountOfJars
              ? state.oneJarScore
              : Math.ceil(totalScore / amountOfJars),
          showGameMessage: true,
          randomCongratulationsWord:
            congratulationsWords[
              Math.floor(Math.random() * congratulationsWords.length)
            ],
          wrongInputMessage: "",
          // ISSUE: this implemetation will add only 1 extra filled jar, even if your input is worth 2+ full new jars
          jarsFilledHistory:
            newScore >= state.oneJarScore
              ? state.jarsFilledHistory + 1
              : state.jarsFilledHistory,
          endOfGame:
            state.userTotalScore + newScore === totalScore ? true : false,
        };
      }

      return {
        ...state,
        isWordShaking: true,
        toggle: !state.toggle,
        wrongInputMessage:
          state.inputWord.length < 4 ? "Prekratka beseda!" : "Napačna beseda!",
      };
    }
    // case "showWordsLeft": {
    //   return {
    //     ...state,
    //     showWordsLeft: !state.showWordsLeft,
    //   };
    // }
    case "showUserWords": {
      return {
        ...state,
        showUserWords: !state.showUserWords,
      };
    }
    case "openOverlay": {
      return {
        ...state,
        showOverlay: true,
        overlayText: action.payload,
      };
    }
    case "closeOverlay": {
      return {
        ...state,
        showOverlay: false,
        overlayText: initialState.overlayText,
      };
    }
    case "resetApp": {
      return { ...state };
    }
    case "resetStatistics": {
      return {
        ...state,
        jarsFilledHistory: 0,
        showOverlay: false,
        overlayText: initialState.overlayText,
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    {
      gameLetters,
      inputWord,
      isWordShaking,
      userSubmitedWords,
      // showWordsLeft,
      showUserWords,
      showOverlay,
      toggle,
      overlayText,
      userTotalScore,
      userCurrentScore,
      userPrevScore,
      oneJarScore,
      randomCongratulationsWord,
      wrongInputMessage,
      jarsFilledHistory,
      endOfGame,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // TODO: if possible, change keyHandler and useEffect in the future to optimize performance; currently, any change in inputWord causes keyHandler to update, consequently triggering useEffect to dismount and mount .addEventListeners every time.
  const keyHandler = useCallback(
    (e) => {
      if (showOverlay === false) {
        if (e.key == "Enter" || e.key == "Return") {
          console.log(userSubmitedWords);

          dispatch({ type: "userSubmitWord", payload: inputWord });
        }
        if (e.key == "Backspace" || e.key == "Delete") {
          dispatch({ type: "deleteLastLetter" });
        }
        // make sure only puzzle letters are allowed as input
        if (e.key.match(gameLettersRegex) && e.key.length == 1) {
          dispatch({ type: "userInputWord", payload: e.key });
        }
      } else {
        if (e.key == "Escape") {
          dispatch({ type: "closeOverlay" });
        }
      }
    },
    [inputWord, showOverlay, userSubmitedWords]
  );

  // add event listener to window object
  useEffect(() => {
    window.addEventListener("keydown", keyHandler, false);
    dispatch({ type: "resetApp" });
    return () => window.removeEventListener("keydown", keyHandler, false);
  }, [keyHandler]);

  //TODO: useEffect should not run on first render!!
  useEffect(() => {
    if (localStorage.getItem("jarsFilled") === null) {
      localStorage.setItem("jarsFilled", 0);
    }
    localStorage.setItem("jarsFilled", jarsFilledHistory);
  }, [jarsFilledHistory]);

  return (
    <>
      {endOfGame && <EndOfGame />}

      {/* <Overlay
        overlayText={overlayText}
        solutionsArray={solutionsArray}
        userSubmitedWords={userSubmitedWords}
        showOverlay={showOverlay}
        dispatch={dispatch}
      /> */}

      {showOverlay && (
        <Overlay
          overlayText={overlayText}
          solutionsArray={solutionsArray}
          userSubmitedWords={userSubmitedWords}
          dispatch={dispatch}
        />
      )}
      <Navbar dispatch={dispatch} />
      <GameLevel
        totalScore={totalScore}
        userTotalScore={userTotalScore}
        userCurrentScore={userCurrentScore}
        userPrevScore={userPrevScore}
        jarsFilledHistory={jarsFilledHistory}
        solutionsArray={solutionsArray}
        userSubmitedWords={userSubmitedWords}
        oneJarScore={oneJarScore}
        // showWordsLeft={showWordsLeft}
        dispatch={dispatch}
      />
      <UserWords
        userSubmitedWords={userSubmitedWords}
        showUserWords={showUserWords}
        dispatch={dispatch}
      />
      <GameMessage
        // check all words submited by user; if there are no words, pass on empty string, otherwise pass on the last submited word
        lastSubmitedWord={
          userSubmitedWords.length > 0
            ? userSubmitedWords[userSubmitedWords.length - 1]
            : ""
        }
        randomCongratulationsWord={randomCongratulationsWord}
        wrongInputMessage={wrongInputMessage}
        toggle={toggle}
      />
      <InputWord
        inputWord={inputWord}
        gameCenterLetter={gameCenterLetter}
        isWordShaking={isWordShaking}
        toggle={toggle}
        dispatch={dispatch}
      />
      <HexagonGroup
        gameLetters={gameLetters}
        gameCenterLetter={gameCenterLetter}
        dispatch={dispatch}
      />
      <GameButtons dispatch={dispatch} inputWord={inputWord} />
    </>
  );
}

export default App;
