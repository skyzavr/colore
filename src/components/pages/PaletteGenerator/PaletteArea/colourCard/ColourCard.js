import classes from './colourCard.module.css';
const ColourCard = ({ colour }) => {
  return (
    <div className={classes.colourCard}>
      <div
        className={classes.bgr}
        style={{ backgroundColor: `${colour}` }}
      ></div>
      <div className={classes.hoverText}>
        <div className={classes.colourHover}>{colour}</div>
        <div className={classes.textHover}>Click to copy</div>
        <div className={classes.textHover}>Hold, move and release to drag</div>
      </div>
    </div>
  );
};
export default ColourCard;
