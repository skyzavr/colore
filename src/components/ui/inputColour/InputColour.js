import { useEffect, useState, useRef } from 'react';
import classes from './InputColour.module.css';
import ColourPicker from '../colourPicker/ColourPicker';
import { getRGB } from '../../../convertFunctions';
import GenerateBtn from '../btn/generateBtn/GenerateBtn';

const InputColour = ({ onSetCOlour, text, inpColour }) => {
  const btnRef = useRef(null);
  const btnColourRef = useRef(null);
  const pickerRef = useRef(null);
  const [colour, setColour] = useState({
    hex: inpColour,
    hue: '',
    sat: '',
    light: '',
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const setColourHandler = (data) => {
    setColour({ ...colour, hex: data });
    updateColourPos(data);
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
  function updateColourPos(col) {
    onSetCOlour(col);
    //get arr of rgb colours
    const rgbArr = getRGB(col);
    let R = rgbArr[0] / 255;
    let G = rgbArr[1] / 255;
    let B = rgbArr[2] / 255;
    const cMax = Math.max(R, G, B);
    const cMin = Math.min(R, G, B);
    const delta = cMax - cMin;
    //hue
    let value = 0;
    if (cMax === R) {
      value = 60 * (((G - B) / delta) % 6);
    } else if (cMax === G) {
      value = 60 * ((B - R) / delta + 2);
    } else if (cMax === B) {
      value = 60 * ((R - G) / delta + 4);
    }
    value = Math.floor(value);
    //saturation
    let satur = delta / (1 - Math.abs(2 * ((cMax + cMin) / 2) - 1));
    let saturColour = 0;
    delta === 0 ? (saturColour = 0) : (saturColour = Math.floor(satur * 100));
    setColour({
      hex: col,
      hue: value,
      sat: saturColour,
      light: Math.floor(((cMax + cMin) / 2) * 100),
    });
  }
  useEffect(() => {
    onSetCOlour(colour.hex);
  });
  useEffect(() => {
    updateColourPos(inpColour);
  }, [inpColour]);
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
          <span className={classes.colorTitle}>{colour.hex}</span>
          {/* if there is bad contrast=>add border         */}
          <div className={classes.inpWrapper}>
            <GenerateBtn clickFunc={() => setColourHandler(generateHex())} />
            <div
              className={classes.colorRect}
              style={{ backgroundColor: `${colour.hex}` }}
              onClick={colorPickerHandler}
              ref={btnColourRef}
            ></div>
          </div>
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
