import { useState, useContext, useEffect } from 'react';
import classes from './ColourSwitching.module.css';
import ColourCardList from '../list/ColourCardList';
import { ThemeContext } from '../../../../../App';

const ColourSwitching = ({ light, dark, coloured }) => {
  const { theme } = useContext(ThemeContext);
  const defaultAmount = 20;
  const [colourBtn, setCOlourBtn] = useState({
    light: true,
    dark: false,
    coloured: false,
  });
  const [cardAmount, setCardAmount] = useState({
    light: defaultAmount,
    dark: defaultAmount,
    coloured: defaultAmount,
  });
  const [currentType, setCurrentType] = useState('light');
  const [defaulColour, setDefaultCOlour] = useState(
    theme === 'light' ? '#212121' : '#ffffff'
  );
  useEffect(() => {
    setDefaultCOlour(theme === 'light' ? '#212121' : '#ffffff');
  }, [theme]);
  const colourSwitchHandler = (param) => {
    if (colourBtn[`${param}`]) return;
    setCurrentType(param);
    const newSet = {};
    for (const value in colourBtn) {
      if (value !== param) newSet[`${value}`] = false;
      if (value === param) newSet[`${param}`] = true;
    }
    setCOlourBtn(newSet);
  };
  const setColour = (param) => {
    return currentType === param ? '#3787ff' : defaulColour;
  };
  const updateCardAmountHandler = (data) => {
    const { value, type } = data;
    if (type === 'light')
      setCardAmount({
        light: value,
        dark: cardAmount.dark,
        coloured: cardAmount.coloured,
      });
    else if (type === 'dark')
      setCardAmount({
        light: cardAmount.light,
        dark: value,
        coloured: cardAmount.coloured,
      });
    else
      setCardAmount({
        light: cardAmount.light,
        dark: cardAmount.dark,
        coloured: value,
      });
  };
  return (
    <div className={classes.wrapper}>
      {[light, dark, coloured].some((el) => el.length !== 0) && (
        <div className={classes.btns}>
          <div
            onClick={() => colourSwitchHandler('light')}
            style={{ color: `${setColour('light')}` }}
          >
            Light
          </div>
          <div
            onClick={() => colourSwitchHandler('dark')}
            style={{ color: `${setColour('dark')}` }}
          >
            Dark
          </div>
          <div
            onClick={() => colourSwitchHandler('coloured')}
            style={{ color: `${setColour('coloured')}` }}
          >
            Coloured
          </div>
        </div>
      )}
      {colourBtn.light && (
        <ColourCardList
          list={light}
          length={cardAmount.light}
          param={'light'}
          defaultAmount={defaultAmount}
          onShowHandler={updateCardAmountHandler}
        />
      )}
      {colourBtn.dark && (
        <ColourCardList
          list={dark}
          length={cardAmount.dark}
          param={'dark'}
          defaultAmount={defaultAmount}
          onShowHandler={updateCardAmountHandler}
        />
      )}
      {colourBtn.coloured && (
        <ColourCardList
          list={coloured}
          length={cardAmount.coloured}
          param={'coloured'}
          defaultAmount={defaultAmount}
          onShowHandler={updateCardAmountHandler}
        />
      )}
    </div>
  );
};
export default ColourSwitching;
