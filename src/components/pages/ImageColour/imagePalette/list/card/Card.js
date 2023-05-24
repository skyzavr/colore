import { useContext, useRef } from 'react';
import classes from './Card.module.css';
import { ThemeContext } from '../../../../../../App';
import { contrastColour } from '../../../../../../convertFunctions';
import { ColourContext } from '../../../../../../App';
const Card = ({ bgrColour }) => {
  const { theme } = useContext(ThemeContext);
  const { setColour } = useContext(ColourContext);
  const CardRef = useRef();
  const copyColorHandler = () => {
    const cardTop = CardRef.current.offsetTop;
    const text = bgrColour;
    let type, message;
    async function copyToClipboard(msg) {
      try {
        await navigator.clipboard.writeText(msg);
        type = 'success';
        message = `The colour ${msg} has been copied!`;
      } catch {
        type = 'error';
        message = `There is some problem...`;
      }
      return { type, message };
    }
    copyToClipboard(text).then((el) => {
      setColour({
        ...el,
        id: Math.floor(Math.random() * 10000),
        cardTop,
      });
    });
  };
  const setBorder = () => {
    const currentTheme = theme === 'light' ? '#ffffff' : '#131313';
    const color = contrastColour(currentTheme, false);
    const rgba = `rgba(${color[0]},${color[1]},${color[2]},0.2)`;
    return rgba;
  };
  return (
    <div className={classes.wrapper} onClick={copyColorHandler} ref={CardRef}>
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
