import { useState, useContext, useEffect } from 'react';
import classes from './Card.module.css';
import { ThemeContext } from '../../../../../../App';
import {
  contrastColour,
  getRGB,
  rgbToSl,
  getLuminosity,
} from '../../../../../../convertFunctions';
const Card = ({ bgrColour }) => {
  const { theme } = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);
  const copyColorHandler = () => {
    const text = bgrColour;
    document.body.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(
        () => {
          //sucsess
          setIsError(false);
        },
        () => {
          //error
          setIsError(true);
        }
      );
    });
    //both popUP
    /*
    todo: when text was copied-> add message. that dissaper in 3 seconds
    //
    todo:if i didn't get permission for this (navigator), show the error
    */
  };
  const setBorder = () => {
    const currentTheme = theme === 'light' ? '#ffffff' : '#131313';
    const color = contrastColour(currentTheme, false);
    const rgba = `rgba(${color[0]},${color[1]},${color[2]},0.2)`;
    return rgba;
  };
  return (
    <div className={classes.wrapper} onClick={copyColorHandler}>
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
