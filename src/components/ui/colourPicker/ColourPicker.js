import { useEffect, useState } from 'react';
import classes from './ColourPicker.module.css';
import HueField from './HueLine/HueField';
import ColourField from './ColourField/ColourField';
import { rgbToHex } from '../../../convertFunctions';
const ColourPicker = ({ onSetColour, onref, defaultValue }) => {
  const [huePos, setHuePos] = useState(defaultValue.hue || 128);
  const [satPos, setSatPos] = useState(defaultValue.sat || 50);
  const [lightPos, setLightPos] = useState(defaultValue.light || 50);
  const [hexColour, setHexColour] = useState(defaultValue.hex);
  const paddingThumb = 20;
  const borderThumb = 2;
  console.log(defaultValue);
  useEffect(() => {
    const newColour = rgbToHex(huePos, satPos, lightPos);
    setHexColour(newColour);
    onSetColour(newColour);
  }, [huePos, satPos, lightPos]);

  return (
    <div className={classes.wrapper} ref={onref}>
      <ColourField
        borderThumb={borderThumb}
        paddingThumb={paddingThumb}
        huePos={huePos}
        onSetLightPos={(data) => setLightPos(data)}
        onSetSatPos={(data) => setSatPos(data)}
        sat={satPos}
        light={lightPos}
      />
      <HueField
        borderThumb={borderThumb}
        paddingThumb={paddingThumb}
        onSetHue={(data) => setHuePos(data)}
      />
      <div className={classes.ColourSettings}>
        <div style={{ color: 'white' }}>
          {huePos} || {satPos} || {lightPos}
        </div>
        <div style={{ color: 'white' }}>{hexColour}</div>
        <br />
      </div>
    </div>
  );
};
export default ColourPicker;
