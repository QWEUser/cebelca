import { useEffect, useRef } from "react";
import styles from "./DeleteButton.module.css";

const clickAndHold = (btnEl) => {
  let timerId;
  const DURATION = 125;

  //handle when clicking down
  const onMouseDown = () => {
    timerId = setInterval(() => {
      btnEl && btnEl.click();
    }, DURATION);
  };

  //stop or clear interval
  const clearTimer = () => {
    timerId && clearInterval(timerId);
  };

  //handle when mouse is clicked
  btnEl.addEventListener("mousedown", onMouseDown);
  //handle when mouse is raised
  btnEl.addEventListener("mouseup", clearTimer);
  //handle mouse leaving the clicked button
  btnEl.addEventListener("mouseout", clearTimer);

  // a callback function to remove listeners useful in libs like react
  // when component or element is unmounted
  return () => {
    btnEl.removeEventListener("mousedown", onMouseDown);
    btnEl.removeEventListener("mouseup", clearTimer);
    btnEl.removeEventListener("mouseout", clearTimer);
  };
};

function DeleteButton({ dispatch }) {
  const btnDeleteRef = useRef(null);

  useEffect(() => {
    const removeListenerDelete = clickAndHold(btnDeleteRef.current);
    return () => {
      removeListenerDelete();
    };
  }, []);

  const clickHandler = () => dispatch({ type: "deleteLastLetter" });

  return (
    <div className={styles.container}>
      <button ref={btnDeleteRef} onClick={clickHandler}>
        Briši
      </button>
    </div>
  );
}

export default DeleteButton;
