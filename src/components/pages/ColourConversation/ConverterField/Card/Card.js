import { useEffect, useState } from 'react';
import InputNummber from '../InputNumber/InputNummber';
import classes from './card.module.css';

const Card = ({ valueList, onUpdateValueListHandler }) => {
  const { title, params, maxValue } = valueList;
  const [list, setList] = useState(params);
  const onUpdateValuesList = (data) => {
    const { ind, el } = data;
    const dupList = [...list];
    dupList[ind] = Number(el);
    setList(dupList);
    onUpdateValueListHandler({ type: title, dupList });
  };
  useEffect(() => {
    setList(params);
  }, [params]);
  return (
    <div className={classes.card}>
      <div className={classes.title}>{title}</div>
      <div className={classes.itemInputs}>
        {list.map((el, ind) => (
          <div className={classes.item} key={Math.floor(Math.random() * 10000)}>
            <InputNummber
              initialValue={el}
              ind={ind}
              maxValue={maxValue[ind]}
              onUpdateValue={onUpdateValuesList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Card;
