import "./Hexagon.css";

function Hexagon({ children, className }) {
  return (
    <div className={`hex ${className}`}>
      <div className="top"></div>
      <div className="middle">{children}</div>
      <div className="bottom"></div>
    </div>
  );
}

export default Hexagon;
