import classes from './Card.module.css';
const Card = ({ title, infoValue }) => {
  //infoValue is an obj
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AA</div>
        <div className={classes.infoValue}>{infoValue.large}:1</div>
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AAA</div>
        <div className={classes.infoValue}>{infoValue.stand}:1</div>
      </div>
    </div>
  );
};
export default Card;
