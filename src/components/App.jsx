import { useEffect, useReducer } from "react";
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
// const notPangrams = allWordsJSON.notPangrams.split(" ");
// const allWords = pangrams.concat(notPangrams).sort();

const vowelRegex = new RegExp(/[aeiou]/);

const initialState = {
  initialPangram: pangrams[Math.floor(Math.random() * pangrams.length)],
  gameCenterLetter: "a",
  gameLetters: ["b", "c", "d", "e", "f", "g"],
  inputWord: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setLetters": {
      const pangramArray = [...initialState.initialPangram];
      const vowelFilteredPangram = [...initialState.initialPangram].filter(
        (letter) => !vowelRegex.test(letter)
      );
      console.log(vowelFilteredPangram);
      const newGameCenterLetter =
        vowelFilteredPangram[
          Math.floor(Math.random() * vowelFilteredPangram.length)
        ];
      return {
        ...state,
        gameCenterLetter: newGameCenterLetter,
        gameLetters: pangramArray.filter(
          (letter) => letter != newGameCenterLetter
        ),
      };
    }
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ gameCenterLetter, gameLetters, inputWord }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const keyHandler = (e) => {
    // make sure only letters are allowed as input
    const regEx = /^[A-Za-zčšžČŠŽ]$/;
    if (e.key.match(regEx)) {
      dispatch({ type: "userInputWord", payload: e.key });
    }
    if (e.key == "Backspace" || e.key == "Delete") {
      dispatch({ type: "deleteLastLetter" });
    }
  };

  // run this on page load
  useEffect(() => {
    window.addEventListener("keydown", keyHandler, false);
    console.log(initialState.initialPangram);
    dispatch({ type: "setLetters" });
    return () => window.removeEventListener("keydown", keyHandler, false);
  }, []);
  return (
    <>
      <GameScore />
      <GameLevel />
      <UserWords />
      <GameMessage />
      <InputWord inputWord={inputWord} />
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
