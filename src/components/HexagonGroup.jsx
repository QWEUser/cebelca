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

function HexagonGroup({ gameLetters, gameCenterLetter }) {
  // create rendered Hexagon components
  const renderedHexagons = gameLetters.map((letter, index) => (
    <Hexagon key={index} className={hexagonClassNames[index]}>
      {letter}
    </Hexagon>
  ));

  // render Hexagons
  return (
    <div className={sytles.hexContainer}>
      <Hexagon className="hexCenter">{gameCenterLetter}</Hexagon>
      {renderedHexagons}
    </div>
  );
}

export default HexagonGroup;
