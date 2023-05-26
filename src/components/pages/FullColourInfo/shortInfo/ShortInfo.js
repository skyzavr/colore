import classes from './shortInfo.module.css';
const ShortInfo = ({ colour }) => {
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.colouredCard}
        style={{ backgroundColor: `${colour}` }}
      ></div>
      {/* separate component */}
      <div className={classes.container}>
        <div className={classes.colourSystemInfo}>
          <div className={classes.item}>
            <div className={classes.systemName}>HEX:</div>
            <div className={classes.systemValue}>{colour}</div>
          </div>
          <div className={classes.item}>
            <div className={classes.systemName}>RGB:</div>
            <div className={classes.systemValue}>249, 227, 204 </div>
          </div>
        </div>

        <div className={classes.colourSystemInfo}>
          <div className={classes.item}>
            <div className={classes.systemName}>HSL:</div>
            <div className={classes.systemValue}>31, 79%, 89%</div>
          </div>
          <div className={classes.item}>
            <div className={classes.systemName}>CMYK</div>
            <div className={classes.systemValue}>24, 24, 24</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShortInfo;
