import styles from "./GameStatistics.module.css";

function GameStatistics() {
  // get history of number of jars filled on this device
  let jarsFilled = localStorage.getItem("jarsFilled");
  if (jarsFilled === null) {
    jarsFilled = 5;
  }

  return (
    <div className={styles.container}>
      <h1>Statistika</h1>
      {(() => {
        if (jarsFilled == 0) {
          return (
            <h2>Na tej napravi ni bil napolnjen še noben kozarec medu.</h2>
          );
        } else if (jarsFilled % 100 == 1) {
          return (
            <h2>Na tej napravi je bil napolnjen {jarsFilled} kozarec medu.</h2>
          );
        } else if (jarsFilled % 100 == 2) {
          return (
            <h2>
              Na tej napravi sta bila napolnjena {jarsFilled} kozarca medu.
            </h2>
          );
        } else if (jarsFilled % 100 == 3 || jarsFilled % 100 == 4) {
          return (
            <h2>
              Na tej napravi so bili napolnjeni {jarsFilled} kozarci medu.
            </h2>
          );
        } else {
          return (
            <h2>
              Na tej napravi je bilo napolnjenih {jarsFilled} kozarcev medu.
            </h2>
          );
        }
      })()}
      {/* {(() => {
        switch (jarsFilled) {
          case 0: {
            return (
              <h2>Na tej napravi ni bil napolnjen še noben kozarec medu.</h2>
            );
          }
          case jarsFilled % 100 == 1: {
            return (
              <h2>
                Na tej napravi je bil napolnjen {jarsFilled} kozarec medu.
              </h2>
            );
          }
          case jarsFilled % 100 == 2: {
            return (
              <h2>
                Na tej napravi sta bila napolnjena {jarsFilled} kozarca medu.
              </h2>
            );
          }
          case jarsFilled % 100 == 3 || jarsFilled % 100 == 4: {
            return (
              <h2>
                Na tej napravi so bili napolnjeni {jarsFilled} kozarci medu.
              </h2>
            );
          }
          default:
            return (
              <h2>
                Na tej napravi je bilo napolnjenih {jarsFilled} kozarcev medu.
              </h2>
            );
        }
      })()} */}
    </div>
  );
}

export default GameStatistics;
