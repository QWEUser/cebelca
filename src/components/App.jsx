import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import allWordsJSON from "../assets/words-data.json";
import badWordsJSON from "../assets/bad-words-data.json";
import GameButtons from "./GameButtons";
import GameLevel from "./GameLevel";
import GameMessage from "./GameMessage";
import HexagonGroup from "./HexagonGroup";
import InputWord from "./InputWord";
import UserWords from "./UserWords";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import EndOfGame from "./EndOfGame";
import Intro from "./Intro";

// app version
const appVersion = "1.1.4.p60";

// yearDay is a string made from current year and current day in year, for example "2024" (year) + "141" (current day in year) = "2024141"
const createTodayYearDay = () => {
  // get a "day of year number", e.g. 1.1.2024 = 1, 2.6.2024 = 154, 31.12.2024 = 366 (leap year);
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff =
    now -
    startOfYear +
    (startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Number(now.getFullYear().toString() + dayOfYear.toString());
};

// define amount of jars that need to be filled to reach total score
const amountOfJars = 10;

const badWords = badWordsJSON.bad_words.split(" ");
const pangrams = allWordsJSON.pangrams
  .split(" ")
  .filter((word) => !badWords.includes(word));
const notPangrams = allWordsJSON.notPangrams
  .split(" ")
  .filter((word) => !badWords.includes(word));
const allWords = pangrams
  .concat(notPangrams)
  // .filter((word) => !badWords.includes(word))
  .sort();

// words that are displayed when user successfuly enters a new word
const congratulationsWords = [
  "Bravo!",
  "Odlično!",
  "Terna!",
  "Super!",
  "Obvladaš!",
  "Noro!",
  "Mojster!",
  "Skriti talent!",
  "Perfekcija!",
  "Genialno!",
  "Uau!",
];

// a recursive function that creates an initial pangram puzzle word and insures there are a minimum number of points in the game
function minPointsGame(pangramNumber, gameType) {
  // console.log("pangramNumber: " + pangramNumber);
  // define minimum points in the game
  const minimumPoints = 60;
  // create an initial Pangram either from a daily game or at random
  let initialPangram = "čebelica";
  if (gameType === "daily") {
    initialPangram = pangrams[pangramNumber % pangrams.length];
  } else if (gameType === "random") {
    initialPangram = pangrams[pangramNumber];
  } else if (gameType === "cebelica") {
    initialPangram = "čebelica";
  }
  // pick a consonant from the word and make it the center letter
  const pangramArray = [...initialPangram];
  const vowelRegex = new RegExp(/[aeiou]/);
  const pangramSetArray = Array.from(new Set(pangramArray));
  const vowelFilteredPangram = pangramSetArray.filter(
    (letter) => !vowelRegex.test(letter)
  );
  // pick a center letter of the game
  // determine which element at index (default = 0) will be chosen for either the daily or random game
  let gameCenterLetterChooser = 0;
  if (gameType === "daily") {
    gameCenterLetterChooser = pangramNumber % vowelFilteredPangram.length;
  } else if (gameType === "random") {
    gameCenterLetterChooser = Math.floor(
      Math.random() * vowelFilteredPangram.length
    );
  } else if (gameType === "cebelica") {
    gameCenterLetterChooser = 0;
  }
  // const gameCenterLetter = vowelFilteredPangram[gameCenterLetterChooser];
  const gameCenterLetter =
    gameType === "cebelica"
      ? "a"
      : vowelFilteredPangram[gameCenterLetterChooser];
  console.log(gameCenterLetter);

  //create regex to check whether a letter is part of puzzle letters
  const gameLettersRegex = new RegExp(`[${pangramSetArray.join("")}]`, "i");

  // create a solutions array from all words
  const containsCenterLetter = allWords.filter((word) =>
    word.includes(gameCenterLetter)
  );
  const solutionsArray = containsCenterLetter.filter((word) => {
    const wordArray = [...word];
    for (let i = 0; i < wordArray.length; i++) {
      if (!gameLettersRegex.test(wordArray[i])) {
        return false;
      }
      if (i === wordArray.length - 1) {
        return true;
      }
    }
  });

  // calculate total score possible

  let totalScore = 0;
  for (const word of solutionsArray) {
    totalScore = totalScore + word.length - 3;
    const wordUniqueLetters = Array.from(new Set([...word]));
    if (wordUniqueLetters.length == 7) {
      totalScore = totalScore + 7;
    }
  }
  if (gameType === "daily" && totalScore < minimumPoints) {
    minPointsGame(pangramNumber + 10000, "daily");
  } else {
    console.log({
      initialPangram: initialPangram,
      solutionsArray: solutionsArray,
      gameCenterLetter: gameCenterLetter,
      totalScore: totalScore,
    });
    console.log(solutionsArray);
    return {
      initialPangram: initialPangram,
      solutionsArray: solutionsArray,
      gameCenterLetter: gameCenterLetter,
      totalScore: totalScore,
      gameLettersRegex: gameLettersRegex,
      pangramSetArray: pangramSetArray,
    };
  }
}

// check whether user prefers light or dark mode
// const userThemePreference = window.matchMedia("(prefers-color-scheme: dark)");

localStorage.getItem("darkMode") == "false"
  ? (document.body.className = "light")
  : (document.body.className = "dark");

// useReducer logic

// reducer function initial state
const initialState = {
  isIntro: true,
  yearDay: localStorage.getItem("yearDay"),
  // localStorage.getItem("darkMode") === null
  //   ? userThemePreference
  //   : localStorage.getItem("darkMode") === "true",
  darkMode:
    localStorage.getItem("darkMode") === null
      ? false
      : localStorage.getItem("darkMode") === "true",

  gameCenterLetter: "b",
  solutionsArray: [],
  totalScore: 0,
  gameLettersRegex: null,
  gameType: null,

  gameLetters: [],
  inputWord: "",
  isWordShaking: false,
  userSubmitedWords: [],
  showUserWords: false,
  userCurrentScore: 0,
  userPrevScore: 0,
  userTotalScore: 0,
  userPrevTotalScore: 0,
  oneJarScore: 1,
  showOverlay: false,
  // toggle is used to force rerender a component -> its value changes between true and false, so the component using key={toggle} forcefully rerenders
  toggle: false,
  overlayText: "",
  randomCongratulationsWord:
    congratulationsWords[
      Math.floor(Math.random() * congratulationsWords.length)
    ],
  wrongInputMessage: "",
  // get history of number of jars filled on this device
  jarsFilledHistory:
    localStorage.getItem("jarsFilled") === null
      ? 0
      : Number(localStorage.getItem("jarsFilled")),
  randomGameJarsLeft: 0,
  dailyGameJarsLeft: 0,
  endOfGame: false,
  isDailyGameFinished:
    JSON.parse(localStorage.getItem("isDailyGameFinished")) || false,
  isRandomGameFinished:
    JSON.parse(localStorage.getItem("isRandomGameFinished")) || false,
  isCebelicaGameFinished: false,
};

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "closeIntro": {
      return { ...state, isIntro: false };
    }
    case "createNewGame": {
      // // recreate todayYearDay as it is not updated in a PWA
      // todayYearDay = createTodayYearDay();
      const todayYearDay = action.payload.todayYearDay;
      // create an object with initial game parameters like initialPangram, solutionsArray, gameCenterLetter, totalScore, gameLettersRegex, pangramSetArray
      // const gameParams =
      //   action.payload.sourcePangram === "daily"
      //     ? minPointsGame(todayYearDay, "daily")
      //     : minPointsGame(
      //         Math.floor(Math.random() * pangrams.length),
      //         "random"
      //       );
      const gameParams = (() => {
        if (action.payload.sourcePangram === "daily") {
          return minPointsGame(todayYearDay, "daily");
        } else if (action.payload.sourcePangram === "random") {
          return minPointsGame(
            Math.floor(Math.random() * pangrams.length),
            "random"
          );
        } else if (action.payload.sourcePangram === "cebelica") {
          return minPointsGame(
            Math.floor(Math.random() * pangrams.length),
            "cebelica"
          );
        }
      })();
      const gameLetters = gameParams["pangramSetArray"].filter(
        (letter) => letter != gameParams["gameCenterLetter"]
      );

      const oneJarScore = Math.floor(gameParams["totalScore"] / amountOfJars);

      if (action.payload.sourcePangram === "daily") {
        localStorage.setItem("yearDay", JSON.stringify(todayYearDay));
      } else {
        console.log(gameParams["solutionsArray"]);
      }

      return {
        ...initialState,
        darkMode: state.darkMode,
        yearDay: todayYearDay,
        solutionsArray: gameParams["solutionsArray"],
        gameCenterLetter: gameParams["gameCenterLetter"],
        totalScore: gameParams["totalScore"],
        gameLetters:
          action.payload.sourcePangram === "cebelica"
            ? gameLetters
            : gameLetters.sort(() => Math.random() - 0.5),
        gameLettersRegex: gameParams["gameLettersRegex"],
        oneJarScore: oneJarScore,
        isIntro: false,
        gameType: action.payload.sourcePangram,
        isDailyGameFinished: false,
        isRandomGameFinished: false,
        isCebelicaGameFinished: false,
        jarsFilledHistory: state.jarsFilledHistory,
      };
    }
    case "continueDailyGame": {
      const gameCenterLetter = JSON.parse(
        localStorage.getItem("dailyGameCenterLetter")
      );
      const gameLetters = JSON.parse(localStorage.getItem("dailyGameLetters"));
      const allGameLetters = [gameCenterLetter].concat(gameLetters);
      const gameLettersRegex = new RegExp(`[${allGameLetters.join("")}]`, "i");
      return {
        ...state,
        gameCenterLetter: gameCenterLetter,
        solutionsArray: JSON.parse(localStorage.getItem("dailySolutionsArray")),
        totalScore: Number(localStorage.getItem("dailyTotalScore")),
        gameLettersRegex: gameLettersRegex,
        gameLetters: gameLetters,
        inputWord: JSON.parse(localStorage.getItem("dailyInputWord")),
        userSubmitedWords: JSON.parse(
          localStorage.getItem("dailyUserSubmitedWords")
        ),
        userCurrentScore: Number(localStorage.getItem("dailyUserCurrentScore")),
        userPrevScore: Number(localStorage.getItem("dailyUserPrevScore")),
        userTotalScore: Number(localStorage.getItem("dailyUserTotalScore")),
        userPrevTotalScore: Number(
          localStorage.getItem("dailyUserPrevTotalScore")
        ),
        oneJarScore: Number(localStorage.getItem("dailyOneJarScore")),
        isIntro: false,
        showOverlay: false,
        gameType: "daily",
        isDailyGameFinished: JSON.parse(
          localStorage.getItem("isDailyGameFinished")
        ),
      };
    }
    case "continueRandomGame": {
      const gameCenterLetter = JSON.parse(
        localStorage.getItem("randomGameCenterLetter")
      );
      const gameLetters = JSON.parse(localStorage.getItem("randomGameLetters"));
      const allGameLetters = [gameCenterLetter].concat(gameLetters);
      const gameLettersRegex = new RegExp(`[${allGameLetters.join("")}]`, "i");
      return {
        ...state,
        gameCenterLetter: gameCenterLetter,
        solutionsArray: JSON.parse(
          localStorage.getItem("randomSolutionsArray")
        ),
        totalScore: Number(localStorage.getItem("randomTotalScore")),
        gameLettersRegex: gameLettersRegex,
        gameLetters: gameLetters,
        inputWord: JSON.parse(localStorage.getItem("randomInputWord")),
        userSubmitedWords: JSON.parse(
          localStorage.getItem("randomUserSubmitedWords")
        ),
        userCurrentScore: Number(
          localStorage.getItem("randomUserCurrentScore")
        ),
        userPrevScore: Number(localStorage.getItem("randomUserPrevScore")),
        userTotalScore: Number(localStorage.getItem("randomUserTotalScore")),
        userPrevTotalScore: Number(
          localStorage.getItem("randomUserPrevTotalScore")
        ),
        oneJarScore: Number(localStorage.getItem("randomOneJarScore")),
        isIntro: false,
        showOverlay: false,
        gameType: "random",
        isRandomGameFinished: JSON.parse(
          localStorage.getItem("isRandomGameFinished")
        ),
      };
    }
    case "shuffleGameLetters":
      // shuffle the gameLetters randomly
      return {
        ...state,
        gameLetters: state.gameLetters.sort(() => Math.random() - 0.5),
      };
    case "userInputWord":
      // update inputWord when a change happens in inputWord
      return {
        ...state,
        inputWord: state.inputWord + action.payload,
      };
    case "removeShake":
      // remove .shake class from component
      return {
        ...state,
        isWordShaking: false,
      };
    case "deleteLastLetter":
      // delete last letter in inputWord
      return {
        ...state,
        inputWord: state.inputWord.slice(0, -1),
      };
    case "userSubmitWord": {
      // check if user input word is valid and add it to userSubmitedWords
      if (
        state.solutionsArray.includes(state.inputWord) &&
        !state.userSubmitedWords.includes(state.inputWord)
      ) {
        const userWord = action.payload;
        let score = userWord.length - 3;
        const wordUniqueLetters = Array.from(new Set([...userWord]));
        if (wordUniqueLetters.length == 7) {
          score = score + 7;
        }

        const newScore = state.userCurrentScore + score;

        return {
          ...state,
          userSubmitedWords: [...state.userSubmitedWords, action.payload],
          inputWord: initialState.inputWord,
          isWordShaking: false,
          userCurrentScore: newScore % state.oneJarScore,
          userPrevScore: state.userCurrentScore,
          userTotalScore: state.userTotalScore + score,
          userPrevTotalScore: state.userTotalScore,
          oneJarScore:
            // state.userTotalScore is reading the previous state, so we need to add newScore
            state.userTotalScore + newScore <
            (state.totalScore * (amountOfJars - 1)) / amountOfJars
              ? state.oneJarScore
              : Math.ceil(state.totalScore / amountOfJars),
          randomCongratulationsWord:
            congratulationsWords[
              Math.floor(Math.random() * congratulationsWords.length)
            ],
          wrongInputMessage: "",
          jarsFilledHistory:
            newScore >= state.oneJarScore
              ? state.jarsFilledHistory +
                Math.floor(newScore / state.oneJarScore)
              : state.jarsFilledHistory,
          endOfGame:
            state.userTotalScore + newScore === state.totalScore ? true : false,
        };
      }
      if (state.userSubmitedWords.includes(state.inputWord)) {
        return {
          ...state,
          isWordShaking: true,
          toggle: !state.toggle,
          wrongInputMessage: "Beseda je že bila uporabljena!",
        };
      }

      return {
        ...state,
        isWordShaking: true,
        toggle: !state.toggle,
        wrongInputMessage:
          state.inputWord.length < 4
            ? "Prekratka beseda!"
            : "Neveljavna beseda!",
      };
    }
    case "showUserWords": {
      return {
        ...state,
        showUserWords: !state.showUserWords,
      };
    }
    case "openOverlay": {
      return {
        ...state,
        showOverlay: true,
        overlayText: action.payload,
      };
    }
    case "closeOverlay": {
      return {
        ...state,
        showOverlay: false,
        overlayText: initialState.overlayText,
      };
    }
    case "resetApp": {
      return { ...state };
    }
    case "showIntro": {
      return { ...state, isIntro: true, showOverlay: false };
    }
    case "resetStatistics": {
      return {
        ...state,
        jarsFilledHistory: 0,
        overlayText: "resetStatisticsText",
      };
    }
    case "toggleDarkMode": {
      let currentDarkMode = state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(!currentDarkMode));
      currentDarkMode == true
        ? (document.body.className = "light")
        : (document.body.className = "dark");
      return { ...state, darkMode: !state.darkMode };
    }
    case "gameOver": {
      return {
        ...state,
        endOfGame: true,
        showOverlay: false,
        isDailyGameFinished:
          state.gameType === "daily" ? true : state.isDailyGameFinished,
        isRandomGameFinished:
          state.gameType === "random" ? true : state.isRandomGameFinished,
        isCebelicaGameFinished:
          state.gameType === "cebelica" ? true : state.isCebelicaGameFinished,
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    {
      isIntro,
      darkMode,
      yearDay,
      gameType,
      solutionsArray,
      gameCenterLetter,
      totalScore,
      gameLettersRegex,
      gameLetters,
      inputWord,
      isWordShaking,
      userSubmitedWords,
      showUserWords,
      showOverlay,
      toggle,
      overlayText,
      userTotalScore,
      userCurrentScore,
      userPrevScore,
      userPrevTotalScore,
      oneJarScore,
      randomCongratulationsWord,
      wrongInputMessage,
      jarsFilledHistory,
      isDailyGameFinished,
      isRandomGameFinished,
      isCebelicaGameFinished,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const keyHandler = useCallback(
    (e) => {
      if (showOverlay === false && isIntro === false) {
        if (e.key == "Enter" || e.key == "Return") {
          // console.log(userSubmitedWords);

          dispatch({ type: "userSubmitWord", payload: inputWord });
        }
        if (e.key == "Backspace" || e.key == "Delete") {
          dispatch({ type: "deleteLastLetter" });
        }
        // make sure only puzzle letters are allowed as input
        if (e.key.match(gameLettersRegex) && e.key.length == 1) {
          dispatch({ type: "userInputWord", payload: e.key });
        }
        if (e.key == "Escape") {
          dispatch({ type: "showIntro" });
        }
      } else {
        if (e.key == "Escape") {
          dispatch({ type: "closeOverlay" });
        }
      }
    },
    [gameLettersRegex, inputWord, isIntro, showOverlay]
  );

  // add event listener to window object
  useEffect(() => {
    window.addEventListener("keydown", keyHandler, false);
    dispatch({ type: "resetApp" });
    return () => window.removeEventListener("keydown", keyHandler, false);
  }, [keyHandler]);

  // localStorage sync
  useEffect(() => {
    if (localStorage.getItem("jarsFilled") === null) {
      localStorage.setItem("jarsFilled", JSON.stringify(0));
    }

    // daily game localStorage sync
    if (gameType === "daily") {
      localStorage.setItem(
        "dailyGameCenterLetter",
        JSON.stringify(gameCenterLetter)
      );
      localStorage.setItem(
        "dailySolutionsArray",
        JSON.stringify(solutionsArray)
      );
      localStorage.setItem("dailyTotalScore", JSON.stringify(totalScore));
      localStorage.setItem("dailyGameLetters", JSON.stringify(gameLetters));

      localStorage.setItem("dailyInputWord", JSON.stringify(inputWord));
      localStorage.setItem(
        "dailyUserSubmitedWords",
        JSON.stringify(userSubmitedWords)
      );
      localStorage.setItem(
        "dailyUserCurrentScore",
        JSON.stringify(userCurrentScore)
      );
      localStorage.setItem("dailyUserPrevScore", JSON.stringify(userPrevScore));
      localStorage.setItem(
        "dailyUserTotalScore",
        JSON.stringify(userTotalScore)
      );
      localStorage.setItem(
        "dailyUserPrevTotalScore",
        JSON.stringify(userPrevTotalScore)
      );
      localStorage.setItem("dailyOneJarScore", JSON.stringify(oneJarScore));
      localStorage.setItem(
        "isDailyGameFinished",
        JSON.stringify(isDailyGameFinished)
      );
    }

    // random game localStorage sync
    if (gameType === "random") {
      localStorage.setItem(
        "randomGameCenterLetter",
        JSON.stringify(gameCenterLetter)
      );
      localStorage.setItem(
        "randomSolutionsArray",
        JSON.stringify(solutionsArray)
      );
      localStorage.setItem("randomTotalScore", JSON.stringify(totalScore));
      localStorage.setItem("randomGameLetters", JSON.stringify(gameLetters));

      localStorage.setItem("randomInputWord", JSON.stringify(inputWord));
      localStorage.setItem(
        "randomUserSubmitedWords",
        JSON.stringify(userSubmitedWords)
      );
      localStorage.setItem(
        "randomUserCurrentScore",
        JSON.stringify(userCurrentScore)
      );
      localStorage.setItem(
        "randomUserPrevScore",
        JSON.stringify(userPrevScore)
      );
      localStorage.setItem(
        "randomUserTotalScore",
        JSON.stringify(userTotalScore)
      );
      localStorage.setItem(
        "randomUserPrevTotalScore",
        JSON.stringify(userPrevTotalScore)
      );

      localStorage.setItem("randomOneJarScore", JSON.stringify(oneJarScore));
      localStorage.setItem(
        "isRandomGameFinished",
        JSON.stringify(isRandomGameFinished)
      );
    }
    localStorage.setItem("jarsFilled", JSON.stringify(jarsFilledHistory));
  }, [
    gameCenterLetter,
    gameLetters,
    gameLettersRegex,
    gameType,
    inputWord,
    isDailyGameFinished,
    isRandomGameFinished,
    jarsFilledHistory,
    oneJarScore,
    solutionsArray,
    totalScore,
    userCurrentScore,
    userPrevScore,
    userPrevTotalScore,
    userSubmitedWords,
    userTotalScore,
  ]);

  return (
    <div className={darkMode ? "dark app-container" : "light app-container"}>
      <div className="app">
        {isIntro && (
          <Intro
            createTodayYearDay={createTodayYearDay}
            yearDay={yearDay}
            isRandomGameFinished={isRandomGameFinished}
            dispatch={dispatch}
          />
        )}
        {((gameType === "random" && isRandomGameFinished === true) ||
          (gameType === "daily" && isDailyGameFinished === true) ||
          (gameType === "cebelica" && isCebelicaGameFinished === true)) && (
          <EndOfGame
            solutionsArray={solutionsArray}
            userSubmitedWords={userSubmitedWords}
            dispatch={dispatch}
          />
        )}
        {((gameType === "random" && isRandomGameFinished === false) ||
          (gameType === "daily" && isDailyGameFinished === false) ||
          (gameType === "cebelica" && isCebelicaGameFinished === false) ||
          isIntro === true) &&
          showOverlay && (
            <Overlay
              overlayText={overlayText}
              solutionsArray={solutionsArray}
              userSubmitedWords={userSubmitedWords}
              darkMode={darkMode}
              dispatch={dispatch}
              amountOfJars={amountOfJars}
              userTotalScore={userTotalScore}
              totalScore={totalScore}
              oneJarScore={oneJarScore}
              appVersion={appVersion}
            />
          )}
        {!isIntro && (
          <>
            <Navbar dispatch={dispatch} />
            <GameLevel
              totalScore={totalScore}
              userTotalScore={userTotalScore}
              userCurrentScore={userCurrentScore}
              userPrevScore={userPrevScore}
              userPrevTotalScore={userPrevTotalScore}
              jarsFilledHistory={jarsFilledHistory}
              solutionsArray={solutionsArray}
              userSubmitedWords={userSubmitedWords}
              oneJarScore={oneJarScore}
              dispatch={dispatch}
            />
            <UserWords
              userSubmitedWords={userSubmitedWords}
              showUserWords={showUserWords}
              dispatch={dispatch}
            />
            <GameMessage
              // check all words submited by user; if there are no words, pass on an empty string, otherwise pass on the last submited word
              lastSubmitedWord={
                userSubmitedWords.length > 0
                  ? userSubmitedWords[userSubmitedWords.length - 1]
                  : ""
              }
              randomCongratulationsWord={randomCongratulationsWord}
              wrongInputMessage={wrongInputMessage}
              toggle={toggle}
            />
            <InputWord
              inputWord={inputWord}
              gameCenterLetter={gameCenterLetter}
              isWordShaking={isWordShaking}
              toggle={toggle}
              dispatch={dispatch}
            />
            <HexagonGroup
              gameLetters={gameLetters}
              gameCenterLetter={gameCenterLetter}
              dispatch={dispatch}
            />
            <GameButtons dispatch={dispatch} inputWord={inputWord} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
