import styles from "./Overlay.module.css";

function Overlay({ dispatch }) {
  return (
    <div
      className={styles.background}
      onClick={() => dispatch({ type: "toggleOverlay" })}
    ></div>
  );
}

export default Overlay;
