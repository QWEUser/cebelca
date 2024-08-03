import BeeIcon from "../NavbarIcons/BeeIcon";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <h1>Kaj je bučela?</h1>
      <p>
        Bučela je igra z besedami, namenjena utrjevanju in širitvi besednega
        zaklada. Nastala je v želji po dostopnosti besednih iger, ki sicer
        prevladujejo v angleškem in drugih večjih svetovnih jezikih, tudi v
        slovenščini. Zasnova med drugim temelji na igri Spelling Bee ameriškega
        časopisa New York Times. Ime igre,{" "}
        <a href="https://fran.si/133/sskj2-slovar-slovenskega-knjiznega-jezika-2/4463797/bucela?View=1&Query=bu%c4%8dela">
          bučela
        </a>
        , izvira iz slovenskega starinskega izraza za čebelo.{" "}
      </p>
      <p>
        Bučela je brezplačna, neprofitna in namenjena nabiranju znanja
        slovenskega jezika.
      </p>
      <p>
        S klikom na vneseno besedo ali na besede v rešitvah lahko odbučite na{" "}
        <a href="https://fran.si/">fran.si</a>, javno dostopni portal s slovarji
        ZRC SAZU, kjer izveste več o izbrani besedi. Hvala Franu za skrb za
        slovenski jezik. :){" "}
      </p>
      <div className={styles.beeContainer}>
        <BeeIcon />
      </div>
      <br></br>
      <p className={styles.contact}>
        Oblikovanje |{" "}
        <a href="https://www.prostorskeprakse.si">prostorskeprakse.si</a>
      </p>
      <p className={styles.contact}>
        Kontakt | <a href="mailto:info@bucela.si">info@bucela.si</a>
      </p>
    </div>
  );
}

export default About;
