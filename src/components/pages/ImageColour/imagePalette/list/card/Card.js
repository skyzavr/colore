import { useContext, useEffect, useState } from 'react';
import classes from './Card.module.css';
import { ThemeContext } from '../../../../../../App';
import { contrastColour } from '../../../../../../convertFunctions';
import { useCopyClipboard } from '../../../../../../hooks/useCopyClipboard';
const Card = ({ bgrColour }) => {
  const { theme } = useContext(ThemeContext);
  const [copy] = useCopyClipboard();
  const setBorder = () => {
    const currentTheme = theme === 'light' ? '#ffffff' : '#131313';
    const color = contrastColour(currentTheme, false);
    const rgba = `rgba(${color[0]},${color[1]},${color[2]},0.2)`;
    return rgba;
  };
  return (
    <div className={classes.wrapper} onClick={() => copy(bgrColour)}>
      <div
        className={classes.card}
        style={{
          backgroundColor: `${bgrColour}`,
          border: `1px solid ${setBorder()}`,
        }}
      ></div>
      <div className={classes.msg}>Click to copy</div>
    </div>
  );
};
export default Card;
