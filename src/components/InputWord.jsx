import styles from "./InputWord.module.css";

function InputWord({ inputWord, gameCenterLetter }) {
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
  return <div className={styles.inputWord}>{inputLetters}</div>;
}

export default InputWord;
