import sytles from "./HexagonGroup.module.css";
import Hexagon from "./Hexagon";

function HexagonGroup() {
  return (
    <div className={sytles.hexContainer}>
      <Hexagon className="hexCenter">A</Hexagon>
      <Hexagon className="hexLeft">B</Hexagon>
      <Hexagon className="hexRight">C</Hexagon>
      <Hexagon className="hexTopRight">D</Hexagon>
      <Hexagon className="hexTopLeft">E</Hexagon>
      <Hexagon className="hexBottomLeft">F</Hexagon>
      <Hexagon className="hexBottomRight">G</Hexagon>
    </div>
  );
}

export default HexagonGroup;
