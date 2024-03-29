import styles from "./InstructionsIcon.module.css";

function InstrucstionsIcon({ dispatch }) {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 19.031096 30.000001"
        xmlSpace="preserve"
        width="19.031096"
        height="30"
        className={styles.st50}
        onClick={() =>
          dispatch({ type: "openOverlay", payload: "instructions" })
        }
      >
        <g
          id="Layer_2"
          transform="matrix(0.21735973,0,0,0.21735973,-21.291307,-16.825817)"
        >
          <path d="m 173.62,87.73 c 7.92,6.88 11.89,16.58 11.89,29.12 0,11.55 -3.78,20.55 -11.33,27 -7.55,6.45 -17.54,9.74 -29.95,9.86 l -0.92,13.82 h -27.64 l -0.92,-34.28 h 11.06 c 9.46,0 16.68,-1.17 21.65,-3.5 4.98,-2.33 7.46,-6.57 7.46,-12.72 0,-4.3 -1.17,-7.68 -3.5,-10.14 -2.34,-2.46 -5.59,-3.69 -9.77,-3.69 -4.42,0 -7.86,1.26 -10.32,3.78 -2.46,2.52 -3.69,5.93 -3.69,10.23 H 97.98 c -0.25,-7.49 1.32,-14.25 4.7,-20.27 3.38,-6.02 8.41,-10.78 15.11,-14.28 6.69,-3.5 14.77,-5.25 24.23,-5.25 13.15,0 23.68,3.44 31.6,10.32 z m -57.31,122.82 c -3.5,-3.25 -5.25,-7.28 -5.25,-12.07 0,-4.91 1.75,-9.03 5.25,-12.35 3.5,-3.32 8.02,-4.98 13.54,-4.98 5.4,0 9.86,1.66 13.36,4.98 3.5,3.32 5.25,7.43 5.25,12.35 0,4.79 -1.75,8.82 -5.25,12.07 -3.5,3.26 -7.96,4.88 -13.36,4.88 -5.52,0.01 -10.03,-1.62 -13.54,-4.88 z" />
        </g>
      </svg>
    </button>
  );
}

export default InstrucstionsIcon;
