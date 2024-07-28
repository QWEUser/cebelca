import sytles from "./GameInstructions.module.css";

function GameInstructions() {
  return (
    <div className={sytles.container}>
      <h1>Navodila</h1>
      <h2>
        Sestavljaj besede s črkami iz satovja in poskusi doseči čim več točk.
      </h2>
      <ul>
        <li>Besede morajo imeti vsaj štiri črke.</li>
        <li>Besede morajo vsebovati srednjo črko.</li>
        <li>Črke lahko uporabiš večkrat.</li>
        {/* <li>Besede z vezaji in kletvice niso na seznamu besed.</li> */}
      </ul>
      <h2>Zbiraj točke in napolni kozarec medu.</h2>
      <ul>
        <li>Besede s štirimi črkami so vredne 1 točko.</li>
        <li>Daljše besede so vredne 1 točko na dodatno črko.</li>
        <li>
          Vsaka uganka vsebuje vsaj eno <b>&#34;bučelo&#34;</b>, ki vsebuje vse
          črke. Bučela je vredna 7 dodatnih točk!
        </li>
      </ul>
    </div>
  );
}

export default GameInstructions;
