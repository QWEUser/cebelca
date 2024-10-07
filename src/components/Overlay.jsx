import styles from "./Overlay.module.css";
import GameInstructions from "./OverlayMessages/GameInstructions";
import GameStatistics from "./GameStatistics";
import GameWordsLeft from "./GameWordsLeft";
import GameSettings from "./OverlayMessages/GameSettings";
import FullJarWindow from "./OverlayMessages/FullJarWindow";
import GameStatisticsDefaultConfirmation from "./OverlayMessages/GameStatisticsDefaultConfirmation";
import GameStatisticsDefaultMessage from "./OverlayMessages/GameStatisticsDefaultMessage";
import RandomGamePrompt from "./OverlayMessages/RandomGamePrompt";
import GameOverPrompt from "./OverlayMessages/GameOverPrompt";
import About from "./OverlayMessages/About";

function Overlay({
  dispatch,
  overlayText,
  solutionsArray,
  userSubmitedWords,
  darkMode,
  amountOfJars,
  userTotalScore,
  totalScore,
  oneJarScore,
  appVersion,
}) {
  return (
    <>
      <div
        className={styles.background}
        onClick={() => dispatch({ type: "closeOverlay" })}
      />
      <div className={styles.containerFlex}>
        <div className={styles.containerScroll}>
          <div className={styles.containerOuter}>
            <button
              className={styles.closingButton}
              onClick={() => dispatch({ type: "closeOverlay" })}
            >
              &times;
            </button>
            <div className={styles.container}>
              {/* render the appropriate component, depending on which navbar icon the user clicked */}
              {(() => {
                switch (overlayText) {
                  case "statistics": {
                    return <GameStatistics dispatch={dispatch} />;
                  }
                  case "settings": {
                    return (
                      <GameSettings darkMode={darkMode} dispatch={dispatch} />
                    );
                  }
                  case "instructions": {
                    return <GameInstructions />;
                  }
                  case "wordsLeft": {
                    return (
                      <GameWordsLeft
                        solutionsArray={solutionsArray}
                        userSubmitedWords={userSubmitedWords}
                        amountOfJars={amountOfJars}
                        userTotalScore={userTotalScore}
                        totalScore={totalScore}
                        dispatch={dispatch}
                        oneJarScore={oneJarScore}
                      />
                    );
                  }
                  case "fullJar": {
                    return <FullJarWindow dispatch={dispatch} />;
                  }
                  case "statisticsDefaultConfirmation": {
                    return (
                      <GameStatisticsDefaultConfirmation dispatch={dispatch} />
                    );
                  }
                  case "resetStatisticsText": {
                    return <GameStatisticsDefaultMessage dispatch={dispatch} />;
                  }
                  case "randomGamePrompt": {
                    return <RandomGamePrompt dispatch={dispatch} />;
                  }
                  case "gameOverPrompt": {
                    return <GameOverPrompt dispatch={dispatch} />;
                  }
                  case "about": {
                    return <About appVersion={appVersion} />;
                  }
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overlay;
