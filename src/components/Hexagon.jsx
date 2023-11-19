import styles from "./Hexagon.module.css";

function Hexagon({ children, className }) {
  return (
    <div className={`${styles.hex} ${styles[className]}`}>
      <div className={styles.top}></div>
      <div className={styles.middle}>{children}</div>
      <div className={styles.bottom}></div>
    </div>
  );
}

export default Hexagon;
