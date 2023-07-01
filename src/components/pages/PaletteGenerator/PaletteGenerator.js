import classes from './paletteGenerator.module.css';
import Palette from './PaletteArea/Palettes';

const PaletteGenerator = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Palette generator</div>
      <Palette />
    </div>
  );
};
export default PaletteGenerator;
