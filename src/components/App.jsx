import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import allWordsJSON from "../assets/words-data.json";
import GameButtons from "./GameButtons";
import GameLevel from "./GameLevel";
import GameMessage from "./GameMessage";
import GameScore from "./GameScore";
import HexagonGroup from "./HexagonGroup";
import InputWord from "./InputWord";
import UserWords from "./UserWords";

// add an OR operator to define hard coded input in case "allWordsJSON is unavailable"
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

//create regex to check weather a letter is part of puzzle letters
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

console.log(solutionsArray);

// reducer function initial state
const initialState = {
  gameLetters: pangramSetArray.filter((letter) => letter != gameCenterLetter),
  inputWord: "",
  userSubmitedWords: [],
  showWordsLeft: true,
};

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
    case "deleteLastLetter":
      // delete last letter in inputWord
      return {
        ...state,
        inputWord: state.inputWord.slice(0, -1),
      };
    case "userSubmitWord": {
      console.log(state.userSubmitedWords);
      return {
        ...state,
        userSubmitedWords: [...state.userSubmitedWords, action.payload],
        // inputWord: "",
        inputWord: initialState.inputWord,
      };
    }
    case "showWordsLeft": {
      return {
        ...state,
        showWordsLeft: !state.showWordsLeft,
      };
    }
    case "resetApp": {
      return { ...state };
    }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { gameLetters, inputWord, userSubmitedWords, showWordsLeft },
    dispatch,
  ] = useReducer(reducer, initialState);

  // if possible, change keyHandler and useEffect in the future to optimize performance; currently, any change in inputWord causes keyHandler to update, consequently triggering useEffect to dismount and mount .addEventListeners every time.
  const keyHandler = useCallback(
    (e) => {
      if (e.key == "Enter" || e.key == "Return") {
        console.log(userSubmitedWords);
        if (
          solutionsArray.includes(inputWord) &&
          !userSubmitedWords.includes(inputWord)
        ) {
          dispatch({ type: "userSubmitWord", payload: inputWord });
        }
      }
      if (e.key == "Backspace" || e.key == "Delete") {
        dispatch({ type: "deleteLastLetter" });
      }
      // make sure only puzzle letters are allowed as input
      if (e.key.match(gameLettersRegex) && e.key.length == 1) {
        dispatch({ type: "userInputWord", payload: e.key });
      }
    },
    [inputWord, userSubmitedWords]
  );

  // add event listener to window object
  useEffect(() => {
    window.addEventListener("keydown", keyHandler, false);
    dispatch({ type: "resetApp" });
    return () => window.removeEventListener("keydown", keyHandler, false);
  }, [keyHandler]);

  return (
    <>
      <GameScore dispatch={dispatch} />
      <GameLevel
        solutionsArray={solutionsArray}
        userSubmitedWords={userSubmitedWords}
        showWordsLeft={showWordsLeft}
      />
      <UserWords userSubmitedWords={userSubmitedWords} />
      <GameMessage />
      <InputWord inputWord={inputWord} gameCenterLetter={gameCenterLetter} />
      <HexagonGroup
        gameLetters={gameLetters}
        gameCenterLetter={gameCenterLetter}
        dispatch={dispatch}
      />
      <GameButtons dispatch={dispatch} />
    </>
  );
}

export default App;
