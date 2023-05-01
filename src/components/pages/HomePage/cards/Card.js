import classes from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ comp, title, path }) => {
  return (
    <div className={classes.card}>
      <Link to={path}>
        <div className={classes.cardImg}>{comp}</div>
        <div className={classes.cardTitle}>{title}</div>
      </Link>
    </div>
  );
};
export default Card;
