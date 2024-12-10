import styles from "./Intro.module.css";
import BeeIcon from "./NavbarIcons/BeeIcon";

// function Intro({ yearDay, todayYearDay, isRandomGameFinished, dispatch }) {
function Intro({
  yearDay,
  isRandomGameFinished,
  dispatch,
  createTodayYearDay,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.beeContainer}>
        <BeeIcon />
      </div>
      <h1>
        bu
        <span
          style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
        >
          č
        </span>
        ela
      </h1>
      {/* <h1>
        č
        <span
          style={{ color: "var(--font-color-secondary)", fontWeight: "bold" }}
        >
          &apos;
        </span>
        belica
      </h1> */}
      <button
        onClick={() => {
          localStorage.getItem("randomGameCenterLetter") &&
          !isRandomGameFinished
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
          const todayYearDay = createTodayYearDay();
          Number(yearDay) === Number(todayYearDay)
            ? dispatch({ type: "continueDailyGame" })
            : dispatch({
                type: "createNewGame",
                payload: { sourcePangram: "daily", todayYearDay: todayYearDay },
              });
          // console.log(yearDay);
          // console.log(todayYearDay);
        }}
      >
        Dnevni izziv
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "createNewGame",
            payload: { sourcePangram: "cebelica" },
          })
        }
      >
        Čebelica
      </button>
      <button
        className={styles.about}
        onClick={() => dispatch({ type: "openOverlay", payload: "about" })}
      >
        {/* <span>* </span>  */}
        Kaj je bučela?
      </button>
    </div>
  );
}

export default Intro;
