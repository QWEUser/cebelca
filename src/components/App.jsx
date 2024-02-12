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
import GameInstructions from "./gameInstructions";

//TODO: get rid of words that contain letter w and y!!
//TODO: get rid of bad words (includng "pedofil")!!
//TODO: fix fonts

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
// create an array of 100 elements with value 0. This array serves as counter for how many words have how many letters

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

// useReducer logic

// reducer function initial state
const initialState = {
  gameLetters: pangramSetArray.filter((letter) => letter != gameCenterLetter),
  inputWord: "",
  userSubmitedWords: [],
  showWordsLeft: false,
  showUserWords: false,
  userCurrentScore: 0,
  showOverlay: true,
  randomCongratulationsWord:
    congratulationsWords[
      Math.floor(Math.random() * congratulationsWords.length)
    ],
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
    // check if user input word is valid and add it to userSubmitedWords
    case "userSubmitWord": {
      console.log(state.userSubmitedWords);
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
        console.log(state.userCurrentScore);

        return {
          ...state,
          userSubmitedWords: [...state.userSubmitedWords, action.payload],
          inputWord: initialState.inputWord,
          userCurrentScore: state.userCurrentScore + score,
          showGameMessage: true,
          randomCongratulationsWord:
            congratulationsWords[
              Math.floor(Math.random() * congratulationsWords.length)
            ],
        };
      }
      return { ...state };
    }
    // case "userSubmitWord": {
    //   console.log(state.userSubmitedWords);
    //   return {
    //     ...state,
    //     userSubmitedWords: [...state.userSubmitedWords, action.payload],
    //     inputWord: initialState.inputWord,
    //     showGameMessage: true,
    //   };
    // }
    case "showWordsLeft": {
      return {
        ...state,
        showWordsLeft: !state.showWordsLeft,
      };
    }
    case "showUserWords": {
      return {
        ...state,
        showUserWords: !state.showUserWords,
      };
    }
    //TODO: toggleOverlay is not working
    case "toggleOverlay": {
      return {
        ...state,
        showOverlay: false,
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
    {
      gameLetters,
      inputWord,
      userSubmitedWords,
      showWordsLeft,
      showUserWords,
      showOverlay,
      userCurrentScore,
      randomCongratulationsWord,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // TODO: if possible, change keyHandler and useEffect in the future to optimize performance; currently, any change in inputWord causes keyHandler to update, consequently triggering useEffect to dismount and mount .addEventListeners every time.
  const keyHandler = useCallback(
    (e) => {
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
      {showOverlay && <Overlay dispatch={dispatch} />}
      <GameInstructions />
      <Navbar />
      <GameLevel
        totalScore={totalScore}
        userCurrentScore={userCurrentScore}
        solutionsArray={solutionsArray}
        userSubmitedWords={userSubmitedWords}
        showWordsLeft={showWordsLeft}
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
      />
      <InputWord inputWord={inputWord} gameCenterLetter={gameCenterLetter} />
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
