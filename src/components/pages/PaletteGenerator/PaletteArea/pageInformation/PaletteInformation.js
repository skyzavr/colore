import Button from '../../../../ui/btn/button/Button';
import classes from './palleteInfo.module.css';

const PaletteInformation = ({ reset, generate }) => {
  return (
    <div className={classes.information}>
      <div className={classes.btnArea}>
        <Button text="Reset" onClickFunc={reset} />
        <Button text="Generate" type="fill" onClickFunc={generate} />
      </div>
    </div>
  );
};
export default PaletteInformation;
