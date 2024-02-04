import styles from "./Hexagon.module.css";

function Hexagon({ children, className, onClick }) {
  // function Hexagon({ props, children }) {
  return (
    <div className={`${styles.hex} ${styles[className]}`} onClick={onClick}>
      <div className={styles.top}></div>
      <div className={styles.middle}>{children}</div>
      <div className={styles.bottom}></div>
      {/* <div className={styles.topCover}></div>
      <div className={styles.middleCover}></div>
      <div className={styles.bottomCover}></div> */}
    </div>
  );
}

export default Hexagon;
