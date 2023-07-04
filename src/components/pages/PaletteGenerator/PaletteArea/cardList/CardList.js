import { generateColour } from '../../../../../convertFunctions';
import Card from '../card/Card';
import classes from './cardList.module.css';

const CardList = ({ onUpdateList, onCreateObj, list: cardlist }) => {
  const onUpdateCardHandler = (data) => {
    const { id, type } = data;
    const list = [...cardlist];
    const index = list.findIndex((el) => el.id === id);
    if (index === -1) return;
    if (type === 'generate') {
      list[index] = onCreateObj(generateColour(), false);
    } else if (type === 'lock') {
      list[index].isLocked = true;
    } else {
      return onUpdateList([
        ...list.slice(0, index),
        ...list.slice(index + 1, list.length),
      ]);
    }
    onUpdateList(list);
  };
  return (
    <div className={classes.cardList}>
      {cardlist.map((el) => (
        <Card elem={el} onUpdate={onUpdateCardHandler} key={el.key} />
      ))}
    </div>
  );
};
export default CardList;
