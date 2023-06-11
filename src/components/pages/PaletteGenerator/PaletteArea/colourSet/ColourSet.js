import classes from './colourSet.module.css';
const ColourSet = ({ colourSet }) => {
  return (
    <div className={classes.colourSet}>
      {Object.keys(colourSet).map((val) => (
        <div className={classes.ColourSetItem}>
          <div>{val}</div>
          <div>{colourSet[val]}</div>
        </div>
      ))}
    </div>
  );
};
export default ColourSet;
