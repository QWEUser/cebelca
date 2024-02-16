import sytles from "./GameInstructions.module.css";

function GameInstructions() {
  return (
    <div className={sytles.container}>
      <h1>Navodila</h1>
      <h2>
        Sestavljajte besede s črkami iz satovja in poskusite doseči čim več
        točk.
      </h2>
      <ul>
        <li>Besede morajo imeti vsaj štiri črke.</li>
        <li>Besede morajo vsebovati srednjo črko.</li>
        <li>Črke lahko uporabite večkrat.</li>
        <li>Besede s pomišljaji in kletvice niso na seznamu besed.</li>
      </ul>
      <h2>Zbirajte točke in napolnite kozarec medu.</h2>
      <ul>
        <li>Besede s štirimi črkami so vredne po 1 točko.</li>
        <li>Daljše besede so vredne 1 točko na dodatno črko.</li>
        <li>
          Vsaka uganka vsebuje vsaj en &#34;pangram&#34;, ki vsebuje vse črke.
          Ti so vredni 7 dodatnih točk!
        </li>
      </ul>
    </div>
  );
}

export default GameInstructions;
