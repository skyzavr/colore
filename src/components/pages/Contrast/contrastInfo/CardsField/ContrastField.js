import Card from '../contrastCard/Card';
import classes from './ContrastField.module.css';

const ContrastField = ({ contrastValue, largeFonts, standartFonts }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.ContrastCard}>
        <div className={classes.info}>Contrast</div>
        <div className={classes.value}>{contrastValue}</div>
      </div>
      <Card title="Large fonts" infoValue={largeFonts} />
      <Card title="Standard fonts" infoValue={standartFonts} />
    </div>
  );
};
export default ContrastField;
