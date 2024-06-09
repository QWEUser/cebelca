import styles from "./Intro.module.css";
import BeeIcon from "./NavbarIcons/BeeIcon";

function Intro({ yearDay, todayYearDay, dispatch }) {
  return (
    <div className={styles.container}>
      <div className={styles.beeContainer}>
        <BeeIcon />
      </div>
      <h1>
        č
        <span
          style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
        >
          &apos;
        </span>
        belica
      </h1>
      <button
        onClick={() => {
          localStorage.getItem("randomGameCenterLetter")
            ? dispatch({
                type: "openOverlay",
                payload: "randomGamePrompt",
              })
            : dispatch({
                type: "createNewGame",
                payload: { sourcePangram: "random" },
              });
        }}
      >
        Naključna igra
      </button>
      <button
        style={{
          backgroundColor: "var(--background-color-secondary)",
        }}
        onClick={() => {
          Number(yearDay) === Number(todayYearDay)
            ? dispatch({ type: "continueDailyGame" })
            : dispatch({
                type: "createNewGame",
                payload: { sourcePangram: "daily" },
              });
          console.log(yearDay);
          console.log(todayYearDay);
        }}
      >
        Dnevni izziv
      </button>
      {/* <button
        style={{
          backgroundColor: "var(--background-color-secondary)",
        }}
        onClick={() => dispatch({ type: "closeIntro" })}
      >
        Dnevni izziv
      </button> */}
    </div>
  );
}

export default Intro;
