import { useEffect, useState } from "react";
import styles from "./ScoreJar.module.css";

function ScoreJar({
  userCurrentScore,
  userPrevScore,
  // jarsFilledHistory,
  userTotalScore,
  oneJarScore,
  dispatch,
}) {
  const [displayScore, setDisplayScore] = useState(userPrevScore);
  const [jarFilled, setJarFilled] = useState(false);
  // determine how full the jar is from 0 to 1
  const jarFullPercentage = 1 - displayScore / oneJarScore;

  const intervalValid = jarFilled
    ? // if jar is filled to the top, intervalValid becomes false, so the score stops adding up
      false
    : // otherwise, check if score needs to be topped up to the new score, or if it needs to fill up to the top of the whole jar
    userCurrentScore > userPrevScore || userTotalScore == 0
    ? displayScore < userCurrentScore
    : displayScore < oneJarScore;

  // animate score adding up with setInterval
  useEffect(() => {
    const interval =
      intervalValid &&
      setInterval(() => setDisplayScore((prevScore) => prevScore + 1), 100);

    return () => clearInterval(interval);
  }, [intervalValid]);

  // once a user inputs a new word, reset jarFilled to false, so the adding up of score can continue
  useEffect(() => {
    setJarFilled(false);
  }, [userTotalScore]);

  if (displayScore == oneJarScore) {
    setJarFilled(true);
    setDisplayScore(userCurrentScore);
  }

  return (
    <div
      className={styles.container}
      onClick={() => dispatch({ type: "openOverlay", payload: "wordsLeft" })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 77.212005 99.999781"
        xmlSpace="preserve"
        width="77.212006"
        height="99.999786"
        key={jarFullPercentage}
      >
        <defs>
          <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop
              offset={1 - displayScore / oneJarScore}
              stopColor="rgba(255, 255, 255, 0)"
            ></stop>
            <stop
              offset={1 - displayScore / oneJarScore}
              stopColor="var(--fill-color-secondary)"
            ></stop>
          </linearGradient>
        </defs>
        <g id="Layer_2" transform="translate(-396.859,-248.40486)">
          <path
            className={styles.st5}
            d="m 399.11804,278.88153 v 54.96249 c 0,8.00523 6.77302,12.16186 13.162,12.26865 0.0493,0 49.50177,0.0329 48.23055,0.0329 4.70907,0 11.30137,-4.32914 11.30137,-12.2707 v -54.99946 c 0,-1.37596 -0.47029,-2.7088 -1.33078,-3.78081 l -11.94828,-14.117 c 2.73755,-0.11501 5.00275,-3.00453 4.89801,-5.63529 -0.0986,-2.4911 -2.16662,-4.57353 -4.75631,-4.67827 -15.16228,0.0472 -30.32661,0.0945 -45.48889,0.14171 -2.84844,-0.0575 -5.18758,2.04546 -5.44634,4.53656 -0.29368,2.83818 2.16457,5.65788 5.44634,5.63529 -4.21825,4.7255 -8.43649,9.45101 -12.65474,14.17651 -0.91183,1.02889 -1.41293,2.35557 -1.41293,3.72742 z"
            // id="path3780"
          />
          <line
            className={styles.st6}
            x1="413.18365"
            y1="259.95282"
            x2="459.1264"
            y2="259.95282"
            // id="line3782"
          />
          <path
            fill="url(#gradient)"
            d="m 416.11831,267.77722 -9.41401,10.63177 c -2.1e-4,10e-6 -0.002,0 -0.002,0 v 0.002 42.10834 7.09561 c 0,7.38912 5.45852,11.01391 10.42841,10.98515 0.0431,0 39.22314,0.0285 38.21479,0.0285 4.52014,-0.20536 8.95394,-3.62473 8.95394,-10.98716 V 278.4066 c 8.2e-4,-4e-5 0.002,3e-5 0.002,0 l -9.3013,-10.62977 z"
            // id="path3784"
          />
        </g>
      </svg>

      <p className={styles.jarScore}>{displayScore}</p>
    </div>
  );
}

export default ScoreJar;
