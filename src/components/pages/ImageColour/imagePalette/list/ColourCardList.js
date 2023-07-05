import { useState } from 'react';
import classes from './ColourCardList.module.css';
import MoreInfoIcon from './MoreInfoIcon';
import Card from './card/Card';
import Button from '../../../../ui/btn/button/Button';
import { Link } from 'react-router-dom';
const ColourCardList = ({
  list,
  length,
  onShowHandler,
  param,
  defaultAmount,
}) => {
  const [listLen, setListLen] = useState(
    list.length < length ? list.length : length
  );
  const ShowMore = () => {
    const value = listLen + defaultAmount;
    const newValue = value >= list.length ? list.length : value;
    setListLen(newValue);
    onShowHandler({ value: newValue, type: param });
  };
  const showMoreInfo = () => {
    return listLen + defaultAmount >= list.length
      ? list.length - listLen
      : defaultAmount;
  };
  const updateListHadler = (value) => {
    setListLen(value);
    onShowHandler({ value: defaultAmount, type: param });
  };
  const setLocalStorageColour = (value) => {
    localStorage.setItem('colour', value);
  };
  return (
    <div className={classes.wrapper}>
      <ul className={classes.cardList}>
        {list.slice(0, listLen).map((el) => (
          <li key={el}>
            <Card bgrColour={el} />
            <div className={classes.param}>
              <p>{el}</p>
              <Link
                target={'_blank'}
                to={'/ColourInfo'}
                onClick={() => setLocalStorageColour(el)}
              >
                <MoreInfoIcon />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {list.length > defaultAmount && (
        <div className={classes.btns}>
          {listLen !== list.length && (
            <Button
              text={`Show more ${showMoreInfo()} cards`}
              type="border"
              onClickFunc={ShowMore}
            />
          )}
          {listLen !== list.length && (
            <Button
              text={`Show all (${list.length - listLen})`}
              type="border"
              onClickFunc={() => updateListHadler(list.length)}
            />
          )}
          {listLen > defaultAmount && (
            <Button
              text="Collapse"
              type="border"
              onClickFunc={() => updateListHadler(defaultAmount)}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default ColourCardList;
