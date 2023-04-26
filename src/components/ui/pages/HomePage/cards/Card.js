import classes from './Card.module.css';
const Card = ({ comp, title }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardImg}>{comp}</div>
      <div className={classes.cardTitle}>{title}</div>
    </div>
  );
};
export default Card;
