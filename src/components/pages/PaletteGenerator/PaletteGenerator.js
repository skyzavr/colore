import classes from './paletteGenerator.module.css';
import Descirption from './pageDescription/Description';
import PaletteInformation from './pageInformation/PaletteInformation';
import Palette from './PaletteArea/Palettes';

const PaletteGenerator = () => {
  return (
    <div className={classes.wrapper}>
      <PaletteInformation />
      <Palette />
      <Descirption />
    </div>
  );
};
export default PaletteGenerator;
