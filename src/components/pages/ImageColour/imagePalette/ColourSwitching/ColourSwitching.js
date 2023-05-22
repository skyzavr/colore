import { useState, useContext, useEffect } from 'react';
import classes from './ColourSwitching.module.css';
import ColourCardList from '../list/ColourCardList';
import { ThemeContext } from '../../../../../App';
const ColourSwitching = ({ light, dark, coloured }) => {
  const { theme } = useContext(ThemeContext);
  const [colourBtn, setCOlourBtn] = useState({
    light: true,
    dark: false,
    coloured: false,
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
  return (
    <div className={classes.wrapper}>
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
      {colourBtn.light && <ColourCardList list={light} />}
      {colourBtn.dark && <ColourCardList list={dark} />}
      {colourBtn.coloured && <ColourCardList list={coloured} />}
    </div>
  );
};
export default ColourSwitching;
