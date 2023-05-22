import classes from './ColourCardList.module.css';
import MoreInfoIcon from './MoreInfoIcon';
import Card from './card/Card';

const ColourCardList = ({ list }) => {
  const moreInfoHadnler = () => {};
  return (
    <ul className={classes.cardList}>
      {list.map((el) => (
        <li key={el}>
          <Card bgrColour={el} />
          <div className={classes.param}>
            <p>{el}</p>
            <MoreInfoIcon clickHandler={moreInfoHadnler} />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ColourCardList;
