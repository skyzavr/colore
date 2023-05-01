import { useEffect, useState, useRef } from 'react';
import classes from './InputColour.module.css';
import ColourPicker from '../colourPicker/ColourPicker';

const InputColour = ({ onSetCOlour, text }) => {
  const [colour, setColour] = useState(generateHex());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const btnRef = useRef(null);
  const btnColourRef = useRef(null);
  const pickerRef = useRef(null);

  const setColourHandler = (data) => {
    setColour(data);
    onSetCOlour(data);
  };
  function randomColour() {
    const Alphabet = '0123456789ABCDEF';
    let value = '';
    for (let index = 0; index < 2; index++) {
      const rndNum = Math.floor(Math.random() * (Alphabet.length - 0) + 0);
      value += Alphabet[rndNum];
    }
    return value;
  }
  function generateHex() {
    let value = '#';
    for (let index = 0; index < 3; index++) {
      value += randomColour();
    }
    return value;
  }
  const colorPickerHandler = () => {
    setIsPickerOpen((prev) => !prev);
  };
  const closeMenuHandler = (event) => {
    if (!isPickerOpen) return;
    const clickeInside = btnRef.current.contains(event.target);
    const btn = btnColourRef.current.contains(event.target);
    const picker = pickerRef.current.contains(event.target);
    if (!clickeInside && !btn && !picker) colorPickerHandler();
  };
  useEffect(() => {
    onSetCOlour(colour);
  });
  useEffect(() => {
    window.addEventListener('mousedown', closeMenuHandler);
    return () => {
      window.removeEventListener('mousedown', closeMenuHandler);
    };
  }, [isPickerOpen]);
  return (
    <>
      <div className={classes.inputColourWrapper} ref={btnRef}>
        <p className={classes.title}>{text}</p>
        <div className={classes.wrapper}>
          <span className={classes.colorTitle}>{colour}</span>
          {/* if there is bad contrast=>add border         */}
          <div
            className={classes.colorRect}
            style={{ backgroundColor: `${colour}` }}
            onClick={colorPickerHandler}
            ref={btnColourRef}
          ></div>
        </div>
      </div>
      {isPickerOpen && (
        <ColourPicker
          defaultValue={colour}
          onSetColour={setColourHandler}
          onref={pickerRef}
        />
      )}
    </>
  );
};
export default InputColour;
