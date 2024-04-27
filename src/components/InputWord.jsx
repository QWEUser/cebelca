// import { useEffect } from "react";
import styles from "./InputWord.module.css";

function InputWord({ inputWord, gameCenterLetter, isWordShaking, toggle }) {
  const inputLetters = [...inputWord].map((letter, index) => {
    if (letter == gameCenterLetter) {
      return (
        <span key={index} className={styles.centerLetter}>
          {letter}
        </span>
      );
    } else {
      return letter;
    }
  });
  return (
    <div className={styles.container}>
      <div
        key={toggle}
        className={`${styles.inputWord} ${isWordShaking ? styles.shake : null}`}
      >
        {inputLetters}
      </div>
    </div>
  );
}

export default InputWord;
