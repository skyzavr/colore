import classes from './InputColour.module.css';
import ColourInputArea from './ColourInputArea/ColourInputArea';
import ColourPicker from './ColourPicker/ColourPicker';
import { useState } from 'react';

const InputColour = ({ onSetColour, colour }) => {
  const [inputColour, setInputColour] = useState(colour);
  const onUpdateColourHandler = (data) => {
    setInputColour(data);
    onSetColour(data);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.inputColourArea}>
        <ColourInputArea
          colour={inputColour}
          onSetColour={onSetColour}
          updateColour={onUpdateColourHandler}
        />
        <ColourPicker
          colour={inputColour}
          onSetColour={onSetColour}
          updateColour={onUpdateColourHandler}
        />
      </div>
    </div>
  );
};
export default InputColour;
