import SaveIcon from '../../../ui/Icons/SaveIcon';
import Button from '../../../ui/btn/button/Button';
import classes from './palleteInfo.module.css';

const PaletteInformation = () => {
  return (
    <div className={classes.information}>
      <div className={classes.title}>Palette generator</div>
      <div className={classes.btnArea}>
        <Button text="Reset" />
        <Button text="Save to bookmarks" type="border">
          {<SaveIcon />}
        </Button>
        <Button text="Generate" type="fill" />
      </div>
    </div>
  );
};
export default PaletteInformation;
