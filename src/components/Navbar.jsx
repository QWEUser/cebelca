import BeeIcon from "./NavbarIcons/BeeIcon";
import StatisticsIcon from "./NavbarIcons/StatisticsIcon";
import SettingsIcon from "./NavbarIcons/SettingsIcon";
import InstructionsIcon from "./NavbarIcons/InstructionsIcon";
import sytles from "./Navbar.module.css";

function Navbar({ dispatch }) {
  return (
    <div className={sytles.container}>
      <div className={sytles.beeContainer}>
        <BeeIcon dispatch={dispatch} />
      </div>
      <div className={sytles.buttonsContainer}>
        <StatisticsIcon dispatch={dispatch} />
        <SettingsIcon dispatch={dispatch} />
        <InstructionsIcon dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Navbar;
