import sytles from "./HexagonGroup.module.css";
import Hexagon from "./Hexagon";

const hexagonClassNames = [
  // "hexCenter",
  "hexLeft",
  "hexRight",
  "hexTopRight",
  "hexTopLeft",
  "hexBottomLeft",
  "hexBottomRight",
];

function HexagonGroup({ gameLetters, gameCenterLetter, dispatch }) {
  const renderedHexagons = gameLetters.map((letter, index) => (
    <Hexagon
      key={index}
      className={hexagonClassNames[index]}
      onClick={() => dispatch({ type: "userInputWord", payload: letter })}
    >
      {letter}
    </Hexagon>
  ));

  // render Hexagons
  return (
    <div className={sytles.hexContainer}>
      <Hexagon
        className="hexCenter"
        onClick={() =>
          dispatch({ type: "userInputWord", payload: gameCenterLetter })
        }
      >
        {gameCenterLetter}
      </Hexagon>
      {renderedHexagons}
    </div>
  );
}

export default HexagonGroup;
