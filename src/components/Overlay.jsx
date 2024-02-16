import styles from "./Overlay.module.css";
import GameInstructions from "./GameInstructions";
import GameStatistics from "./GameStatistics";

function Overlay({ dispatch, overlayText }) {
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
            case "instructions": {
              return <GameInstructions />;
            }
            case "statistics": {
              return <GameStatistics />;
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
