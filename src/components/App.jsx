import "./App.css";
import GameButtons from "./GameButtons";
import HexagonGroup from "./HexagonGroup";
import InputWord from "./InputWord";
import UserWords from "./UserWords";

function App() {
  return (
    <>
      <UserWords />
      <InputWord />
      <HexagonGroup />
      <GameButtons />
    </>
  );
}

export default App;
