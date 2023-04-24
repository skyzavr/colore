import { useEffect, useContext, useState } from 'react';
import classes from './Switch.module.css';
import LightIcon from './lightIcon';
import DarkIcon from './DarkIcon';
import { ThemeContext } from '../../../../App';
const Switch = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === 'light' ? false : true);
  const themeToggle = () => {
    setTheme(checked ? 'light' : 'dark');
    //because useState won't update it in time, so logic is upsideDown
    setChecked(!checked);
  };
  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, checked]);
  return (
    <>
      <LightIcon />
      <label className={classes.switch}>
        <input type="checkbox" onChange={themeToggle} checked={checked} />
        <span className={classes.slider}></span>
      </label>
      <DarkIcon />
    </>
  );
};
export default Switch;
