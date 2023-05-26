import classes from './info.module.css';
const Info = ({ colour }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <div className={classes.title}>Color information</div>
        <div className={classes.hexName}>{colour}</div>
      </div>
      <div className={classes.c}>Close</div>
    </div>
  );
};
export default Info;
