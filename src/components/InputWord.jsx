import styles from "./InputWord.module.css";

//make sure only letters and an empty string are allowed as input
// const regEx = /^$|^[A-Za-zčšž]+$/;

function InputWord({ inputWord }) {
  // // return <div className={styles.inputWord}>TEST</div>;
  // function checkInput(e) {
  //   if (e.target.value.match(regEx)) {
  //     dispatch({ type: "userInputWord", payload: e.target.value });
  //   }
  // }

  return (
    // <input
    //   className={styles.inputWord}
    //   type="text"
    //   value={inputWord}
    //   onChange={(e) => checkInput(e)}
    //   autoFocus
    // ></input>
    <div className={styles.inputWord}>{inputWord}</div>
  );
}

export default InputWord;
