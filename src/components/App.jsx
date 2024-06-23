import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import allWordsJSON from "../assets/words-data.json";
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

//TODO: get rid of bad words (including "pedofil", "fafati", "citroen"?, "engineering"?, "ziza")!!

// get a "day of year number", e.g. 1.1.2024 = 1, 2.6.2024 = 154, 31.12.2024 = 366 (leap year);
const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 0);
const diff =
  now -
  startOfYear +
  (startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = Math.floor(diff / oneDay);
// console.log("Day of year: " + dayOfYear);

// yearDay is a string made from current year and current day in year, for example "2024" (year) + "141" (current day in year) = "2024141"
const todayYearDay = Number(
  now.getFullYear().toString() + dayOfYear.toString()
);
console.log(todayYearDay);
// const yearDay = Number(now.getFullYear().toString() + dayOfYear.toString());
// console.log(yearDay);

// define amount of jars that need to be filled to reach total score
const amountOfJars = 10;

//TODO: add an OR operator to define hard coded input in case "allWordsJSON is unavailable"
const pangrams = allWordsJSON.pangrams.split(" ");
const notPangrams = allWordsJSON.notPangrams.split(" ");
console.log(pangrams.length);
const allWords = pangrams.concat(notPangrams).sort();

// // create a random new game on page load
// // randomly choose a pangram
// const initialPangram = pangrams[Math.floor(Math.random() * pangrams.length)];

// // pick a consonant from the word and make it the center letter
// const pangramArray = [...initialPangram];
// const vowelRegex = new RegExp(/[aeiou]/);
// const pangramSetArray = Array.from(new Set(pangramArray));
// const vowelFilteredPangram = pangramSetArray.filter(
//   (letter) => !vowelRegex.test(letter)
// );
// const gameCenterLetter =
//   vowelFilteredPangram[Math.floor(Math.random() * vowelFilteredPangram.length)];
// console.log(initialPangram);

// //create regex to check whether a letter is part of puzzle letters
// const gameLettersRegex = new RegExp(`[${pangramSetArray.join("")}]`, "i");

// // create a solutions array from all words
// const containsCenterLetter = allWords.filter((word) =>
//   word.includes(gameCenterLetter)
// );
// const solutionsArray = containsCenterLetter.filter((word) => {
//   const wordArray = [...word];
//   for (let i = 0; i < wordArray.length; i++) {
//     if (!gameLettersRegex.test(wordArray[i])) {
//       return false;
//     }
//     if (i === wordArray.length - 1) {
//       return true;
//     }
//   }
// });

// // calculate total score possible

// let totalScore = 0;
// let countPangrams = 0;
// for (const word of solutionsArray) {
//   totalScore = totalScore + word.length - 3;
//   const wordUniqueLetters = Array.from(new Set([...word]));
//   if (wordUniqueLetters.length == 7) {
//     totalScore = totalScore + 7;
//     countPangrams++;
//     console.log(
//       "initial page load: pangram: " +
//         word +
//         " , number of pangrams found: " +
//         countPangrams
//     );
//   }
// }

// console.log(solutionsArray);
// console.log(totalScore);

// // devide the totalScore to predetermined amount of jars and save the score to an array. For example, if totalScore = 101 and amountOfJars = 5, totalJarsScore should be [20,40,60,80,101] (all elements are rounded down, except the last element, which is orunded up)
// const amountOfJars = 10;

// const totalJarScoresArray = Array.from(
//   { length: amountOfJars },
//   (_e, index) => {
//     if (index !== amountOfJars - 1) {
//       return Math.floor(((index + 1) * totalScore) / amountOfJars);
//     } else {
//       return Math.ceil(((index + 1) * totalScore) / amountOfJars);
//     }
//   }
// );

// console.log(totalJarScoresArray);

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

// check whether user prefers light or dark mode
const userThemePreference = window.matchMedia("(prefers-color-scheme: dark)");

// useReducer logic

// reducer function initial state
const initialState = {
  isIntro: true,
  yearDay: localStorage.getItem("yearDay"),
  darkMode:
    localStorage.getItem("darkMode") === null
      ? userThemePreference
      : localStorage.getItem("darkMode") === "true",

  gameCenterLetter: "b",
  solutionsArray: [],
  totalScore: 0,
  gameLettersRegex: null,
  gameType: null,

  gameLetters: [],
  // gameLetters: pangramSetArray.filter((letter) => letter != gameCenterLetter),
  inputWord: "",
  isWordShaking: false,
  userSubmitedWords: [],
  // showWordsLeft: false,
  showUserWords: false,
  userCurrentScore: 0,
  userPrevScore: 0,
  userTotalScore: 0,
  userPrevTotalScore: 0,
  oneJarScore: 1,
  // oneJarScore: Math.floor(totalScore / amountOfJars),
  // jarFilled: false,
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
  //TODO: continue here
  randomGameJarsLeft: 0,
  dailyGameJarsLeft: 0,
  endOfGame: false,
  isDailyGameFinished:
    JSON.parse(localStorage.getItem("isDailyGameFinished")) || false,
  isRandomGameFinished:
    JSON.parse(localStorage.getItem("isRandomGameFinished")) || false,
};

console.log("oneJarScore: " + initialState.oneJarScore);

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "closeIntro": {
      return { ...state, isIntro: false };
    }
    case "createNewGame": {
      // create an initial Pangram either from a daily game or at random
      let initialPangram = "čebelica";
      if (action.payload.sourcePangram === "daily") {
        initialPangram = pangrams[todayYearDay % pangrams.length];
        // initialPangram = pangrams[yearDay % pangrams.length];
      } else if (action.payload.sourcePangram === "random") {
        initialPangram = pangrams[Math.floor(Math.random() * pangrams.length)];
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
      if (action.payload.sourcePangram === "daily") {
        gameCenterLetterChooser = todayYearDay % vowelFilteredPangram.length;
      } else if (action.payload.sourcePangram === "random") {
        gameCenterLetterChooser = Math.floor(
          Math.random() * vowelFilteredPangram.length
        );
      }
      console.log("gameCenterLetterChooser: " + gameCenterLetterChooser);

      const gameCenterLetter = vowelFilteredPangram[gameCenterLetterChooser];
      // vowelFilteredPangram[
      //   // Math.floor(Math.random() * vowelFilteredPangram.length)
      //   todayYearDay % vowelFilteredPangram.length ||
      //     // yearDay % vowelFilteredPangram.length ||
      //     //TODO: this is causing the daily game to have different solutions!!!
      //     Math.floor(Math.random() * vowelFilteredPangram.length)
      // ];
      console.log(initialPangram);

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
      let countPangrams = 0;
      for (const word of solutionsArray) {
        totalScore = totalScore + word.length - 3;
        const wordUniqueLetters = Array.from(new Set([...word]));
        if (wordUniqueLetters.length == 7) {
          totalScore = totalScore + 7;
          countPangrams++;
          console.log(
            "initial page load: pangram: " +
              word +
              " , number of pangrams found: " +
              countPangrams
          );
        }
      }

      console.log(solutionsArray);
      console.log(totalScore);

      // devide the totalScore to predetermined amount of jars and save the score to an array. For example, if totalScore = 101 and amountOfJars = 5, totalJarsScore should be [20,40,60,80,101] (all elements are rounded down, except the last element, which is orunded up)
      // const amountOfJars = 10;

      const totalJarScoresArray = Array.from(
        { length: amountOfJars },
        (_e, index) => {
          if (index !== amountOfJars - 1) {
            return Math.floor(((index + 1) * totalScore) / amountOfJars);
          } else {
            return Math.ceil(((index + 1) * totalScore) / amountOfJars);
          }
        }
      );

      console.log(totalJarScoresArray);

      const gameLetters = pangramSetArray.filter(
        (letter) => letter != gameCenterLetter
      );

      const oneJarScore = Math.floor(totalScore / amountOfJars);

      if (action.payload.sourcePangram === "daily") {
        localStorage.setItem("yearDay", JSON.stringify(todayYearDay));
        // localStorage.setItem("yearDay", JSON.stringify(yearDay));
      }

      return {
        ...initialState,
        yearDay: todayYearDay,
        solutionsArray: solutionsArray,
        gameCenterLetter: gameCenterLetter,
        totalScore: totalScore,
        gameLetters: gameLetters.sort(() => Math.random() - 0.5),
        gameLettersRegex: gameLettersRegex,
        oneJarScore: oneJarScore,
        isIntro: false,
        gameType: action.payload.sourcePangram,
        isDailyGameFinished: false,
        isRandomGameFinished: false,
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
          // TODO: ISSUE: this implemetation will add only 1 extra filled jar, even if your input is worth 2+ full new jars
          userCurrentScore:
            // newScore >= state.oneJarScore
            //   ? newScore % state.oneJarScore
            //   : // ? newScore - state.oneJarScore
            //     newScore,
            newScore % state.oneJarScore,
          userPrevScore: state.userCurrentScore,
          userTotalScore: newScore,
          userPrevTotalScore: state.userTotalScore,
          oneJarScore:
            // state.userTotalScore is reading the previous state, so we need to add newScore
            state.userTotalScore + newScore <
            (state.totalScore * (amountOfJars - 1)) / amountOfJars
              ? state.oneJarScore
              : Math.ceil(state.totalScore / amountOfJars),
          // state.userTotalScore + newScore <
          // (totalScore * (amountOfJars - 1)) / amountOfJars
          //   ? state.oneJarScore
          //   : Math.ceil(totalScore / amountOfJars),
          // showGameMessage: true,
          randomCongratulationsWord:
            congratulationsWords[
              Math.floor(Math.random() * congratulationsWords.length)
            ],
          wrongInputMessage: "",
          // TODO: ISSUE: this implemetation will add only 1 extra filled jar, even if your input is worth 2+ full new jars
          // jarsFilledHistory:
          //   newScore >= state.oneJarScore
          //     ? state.jarsFilledHistory + 1
          //     : state.jarsFilledHistory,
          jarsFilledHistory:
            newScore >= state.oneJarScore
              ? state.jarsFilledHistory +
                Math.floor(newScore / state.oneJarScore)
              : state.jarsFilledHistory,
          // jarFilled: false,
          endOfGame:
            state.userTotalScore + newScore === state.totalScore ? true : false,
          // state.userTotalScore + newScore === totalScore ? true : false,
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
          state.inputWord.length < 4 ? "Prekratka beseda!" : "Napačna beseda!",
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
        // isIntro: false,
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
        // showOverlay: false,
        overlayText: "resetStatisticsText",
      };
    }
    case "toggleDarkMode": {
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
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
      // endOfGame,
      isDailyGameFinished,
      isRandomGameFinished,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // TODO: if possible, change keyHandler and useEffect in the future to optimize performance; currently, any change in inputWord causes keyHandler to update, consequently triggering useEffect to dismount and mount .addEventListeners every time.
  const keyHandler = useCallback(
    (e) => {
      if (showOverlay === false && isIntro === false) {
        if (e.key == "Enter" || e.key == "Return") {
          console.log(userSubmitedWords);

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
    [gameLettersRegex, inputWord, isIntro, showOverlay, userSubmitedWords]
  );

  // add event listener to window object
  useEffect(() => {
    window.addEventListener("keydown", keyHandler, false);
    dispatch({ type: "resetApp" });
    return () => window.removeEventListener("keydown", keyHandler, false);
  }, [keyHandler]);

  // localStorage sync
  //TODO: useEffect should not run on first render!!
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
      // localStorage.setItem(
      //   "dailyGameLettersRegex",
      //   JSON.stringify(gameLettersRegex)
      // );
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
      // localStorage.setItem(
      //   "randomGameLettersRegex",
      //   JSON.stringify(gameLettersRegex)
      // );
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

  // fetch current date from wordldtimeapi wrapped in a useEffect
  // useEffect(() => {
  //   const fetchDate = async () => {
  //     await fetch("http://worldtimeapi.org/api/timezone/Europe/Ljubljana")
  //       .then((response) => {
  //         //handle response
  //         // console.log(response);
  //         return response.json();
  //       })
  //       .then((data) => {
  //         //handle data
  //         console.log(data);
  //         console.log(data["day_of_year"]);
  //         // yearDay is a string made from current year and current day in year, for example "2024" (year) + "141" (current day in year) = "2024141"
  //         const yearDay = Number(
  //           data["datetime"].slice(0, 4) + data["day_of_year"].toString()
  //         );
  //         // choose daily pangram
  //         const dailyPangram = pangrams[yearDay % pangrams.length];
  //         dispatch({
  //           type: "createNewGame",
  //           payload: { sourcePangram: dailyPangram, yearDay: yearDay },
  //         });
  //       })
  //       .catch((error) => {
  //         //handle error
  //         throw new Error(error);
  //       });
  //   };
  //   fetchDate();
  // }, []);

  return (
    <div className={darkMode ? "dark app-container" : "light app-container"}>
      <div className="app">
        {isIntro && (
          <Intro
            yearDay={yearDay}
            todayYearDay={todayYearDay}
            isRandomGameFinished={isRandomGameFinished}
            dispatch={dispatch}
          />
        )}
        {/* TODO: this is not working right now */}
        {((gameType === "random" && isRandomGameFinished === true) ||
          (gameType === "daily" && isDailyGameFinished === true)) && (
          <EndOfGame
            solutionsArray={solutionsArray}
            userSubmitedWords={userSubmitedWords}
            dispatch={dispatch}
          />
        )}
        {/* {endOfGame && (
          <EndOfGame
            solutionsArray={solutionsArray}
            userSubmitedWords={userSubmitedWords}
          />
        )} */}
        {((gameType === "random" && isRandomGameFinished === false) ||
          (gameType === "daily" && isDailyGameFinished === false) ||
          isIntro === true) &&
          showOverlay && (
            <Overlay
              overlayText={overlayText}
              solutionsArray={solutionsArray}
              userSubmitedWords={userSubmitedWords}
              darkMode={darkMode}
              dispatch={dispatch}
              amountOfJars={amountOfJars}
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
