import styles from "./HexagonSVG.module.css";

function HexagonSVG({ children, className, onClick }) {
  return (
    <>
      <div className={`${styles.hex} ${styles[className]}`} onClick={onClick}>
        {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="var(--hex-width)"
        height="var(--hex-height)"
        fill="var(--fill-color-primary)"
        stroke="4px"
        viewBox="0 0 var(--hex-width) var(--hex-height)"
        >
        <path d="M14 4.577v6.846L8 15l-6-3.577V4.577L8 1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />{" "}
        {children}
      </svg> */}

        {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="var(--hexsvg-width)"
        className={styles.hexagonBorder}
      >
        <path
          // fill="none"
          // strokeWidth="0.8"
          d="M4.75 8L12 4l7.25 4v8L12 20l-7.25-4V8Z"
        ></path>
      </svg>
      {children} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 86.4 95.65103"
          viewBox="0 0 72 79.709191"
          version="1.1"
          width="82"
          // width="86.4"
          // width="72"
          // className={styles.svgImage}
          className={styles.hexagonBorder}
          // height="79.70919"
        >
          <path
            d="m 3.4,21.86 32.6,-18 32.6,18 v 36 l -32.6,18 -32.6,-18 z"
            // d="m 3.375,21.854598 32.625,-18 32.625,18 v 35.999998 l -32.625,18 -32.625,-18 z"
            //  style="fill:none;stroke:#000000;stroke-width:6.75"
          />
        </svg>
        <div className={styles.letterContainer}>{children}</div>
      </div>
    </>
  );
}

export default HexagonSVG;
