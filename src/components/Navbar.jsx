import BeeIcon from "./NavbarIcons/BeeIcon";
import StatisticsIcon from "./NavbarIcons/StatisticsIcon";
import SettingsIcon from "./NavbarIcons/SettingsIcon";
import InstructionsIcon from "./NavbarIcons/InstructionsIcon";
import sytles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={sytles.container}>
      <BeeIcon />
      <div className={sytles.buttonsContainer}>
        <StatisticsIcon />
        <SettingsIcon />
        <InstructionsIcon />
      </div>
    </div>
  );
}

export default Navbar;
