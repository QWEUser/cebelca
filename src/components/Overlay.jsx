import styles from "./Overlay.module.css";
import GameInstructions from "./GameInstructions";
import GameStatistics from "./GameStatistics";
import GameWordsLeft from "./GameWordsLeft";

function Overlay({
  dispatch,
  overlayText,
  solutionsArray,
  userSubmitedWords,
  //TODO: use showOverlay to transition overlay + overlayText
  // showOverlay,
}) {
  return (
    <>
      <div
        className={styles.background}
        // style={showOverlay && { display: "none" }}
        onClick={() => dispatch({ type: "closeOverlay" })}
      />
      <div className={styles.container}>
        <button
          className={styles.closingButton}
          onClick={() => dispatch({ type: "closeOverlay" })}
        >
          &times;
        </button>
        {/* render the appropriate component, depending on which navbar icon the user clicked */}
        {(() => {
          switch (overlayText) {
            case "instructions": {
              return <GameInstructions />;
            }
            case "statistics": {
              return <GameStatistics dispatch={dispatch} />;
            }
            case "wordsLeft": {
              return (
                <GameWordsLeft
                  solutionsArray={solutionsArray}
                  userSubmitedWords={userSubmitedWords}
                />
              );
            }
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
}

export default Overlay;
