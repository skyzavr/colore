import classes from './colourParams.module.css';
const ColourParams = ({ colour, btns }) => {
  return (
    <div className={classes.colourParams}>
      <div className={classes.colourName}>{colour}</div>
      <div className={classes.colourBtns}>
        {btns.map((btn) => (
          <div className={classes.btnItem}>{btn}</div>
        ))}
      </div>
    </div>
  );
};
export default ColourParams;
