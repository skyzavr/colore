import { useState, useEffect } from 'react';
import classes from './colourPicker.module.css';
const ColourPicker = ({ colour, updateColour }) => {
  const [value, setValue] = useState(colour.toUpperCase());
  const setColourHandler = (e) => {
    setValue(e.target.value);
    updateColour(e.target.value);
  };
  useEffect(() => {
    setValue(colour);
  }, [colour]);
  return (
    <input
      type="color"
      value={value}
      style={{ color: colour }}
      onChange={(e) => setColourHandler(e)}
      className={classes.inputColourPicker}
    />
  );
};
export default ColourPicker;
