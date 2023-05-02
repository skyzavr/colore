import { useState, useEffect } from 'react';
import classes from './Card.module.css';

const Card = ({ title, ratio, AA, AAA }) => {
  const getMark = () => {
    if (ratio >= Number(AAA)) return 'Great';
    if (ratio >= Number(AA)) return 'Good';
    return 'Poor';
  };
  const [mark, setMark] = useState(getMark());
  useEffect(() => {
    setMark(getMark());
  }, [ratio]);
  return (
    <div className={classes[`wrapper`] + ' ' + classes[`${mark}`]}>
      <div className={classes.title}>{title}</div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AA</div>
        <div className={classes.infoValue}>{AA}:1</div>
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AAA</div>
        <div className={classes.infoValue}>{AAA}:1</div>
      </div>
    </div>
  );
};
export default Card;
