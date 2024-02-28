import styles from "./Overlay.module.css";
import GameInstructions from "./GameInstructions";
import GameStatistics from "./GameStatistics";
import GameWordsLeft from "./GameWordsLeft";
import GameSettings from "./GameSettings";
import FullJarWindow from "./FullJarWindow";

function Overlay({
  dispatch,
  overlayText,
  solutionsArray,
  userSubmitedWords,
  darkMode,
}) {
  return (
    <>
      <div
        className={styles.background}
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
            case "statistics": {
              return <GameStatistics dispatch={dispatch} />;
            }
            case "settings": {
              return <GameSettings darkMode={darkMode} dispatch={dispatch} />;
            }
            case "instructions": {
              return <GameInstructions />;
            }
            case "wordsLeft": {
              return (
                <GameWordsLeft
                  solutionsArray={solutionsArray}
                  userSubmitedWords={userSubmitedWords}
                />
              );
            }
            case "fullJar": {
              return <FullJarWindow dispatch={dispatch} />;
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
