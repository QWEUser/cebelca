import { useReducer } from "react";
import "./App.css";
import GameButtons from "./GameButtons";
import GameLevel from "./GameLevel";
import GameMessage from "./GameMessage";
import GameScore from "./GameScore";
import HexagonGroup from "./HexagonGroup";
import InputWord from "./InputWord";
import UserWords from "./UserWords";

// const gameLetters = ["B", "C", "D", "E", "F", "G"];
const gameCenterLetter = "A";

const initialState = {
  gameLetters: ["B", "C", "D", "E", "F", "G"],
  inputWord: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "shuffleGameLetters":
      // shuffle the gameLetters randomly
      return {
        ...state,
        gameLetters: state.gameLetters.sort(() => Math.random() - 0.5),
      };
    case "userInputWord":
      // update inputWord when a change happens in input (inputWord.jsx)
      console.log(state.inputWord);
      return {
        ...state,
        inputWord: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ gameLetters, inputWord }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <>
      <GameScore />
      <GameLevel />
      <UserWords />
      <GameMessage />
      <InputWord inputWord={inputWord} dispatch={dispatch} />
      <HexagonGroup
        gameLetters={gameLetters}
        gameCenterLetter={gameCenterLetter}
      />
      <GameButtons dispatch={dispatch} />
    </>
  );
}

export default App;
