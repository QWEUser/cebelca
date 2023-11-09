import "./App.css";

function App() {
  return (
    <>
      <div className="hex-container">
        <div className="hex hex-center">
          <div className="top"></div>
          <div className="middle">center</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-left">
          <div className="top"></div>
          <div className="middle">left</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-right">
          <div className="top"></div>
          <div className="middle">right</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-top-right">
          <div className="top"></div>
          <div className="middle">top-right</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-top-left">
          <div className="top"></div>
          <div className="middle">top-left</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-bottom-left">
          <div className="top"></div>
          <div className="middle">bottom-left</div>
          <div className="bottom"></div>
        </div>
        <div className="hex hex-bottom-right">
          <div className="top"></div>
          <div className="middle">bottom-right</div>
          <div className="bottom"></div>
        </div>
      </div>
    </>
  );
}

export default App;
