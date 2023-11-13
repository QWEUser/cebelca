import "./HexagonGroup.css";
import Hexagon from "./Hexagon";

function HexagonGroup() {
  return (
    <div className="hex-container">
      <Hexagon className="hex-center">A</Hexagon>
      <Hexagon className="hex-left">B</Hexagon>
      <Hexagon className="hex-right">C</Hexagon>
      <Hexagon className="hex-top-right">D</Hexagon>
      <Hexagon className="hex-top-left">E</Hexagon>
      <Hexagon className="hex-bottom-left">F</Hexagon>
      <Hexagon className="hex-bottom-right">G</Hexagon>
    </div>
  );
}

export default HexagonGroup;
