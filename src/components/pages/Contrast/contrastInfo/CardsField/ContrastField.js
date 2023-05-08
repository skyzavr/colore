import { useState, useEffect } from 'react';
import Card from '../contrastCard/Card';
import classes from './ContrastField.module.css';
import { hexToDec } from '../../../../../convertFunctions';

const ContrastField = ({ colour, bgrColour }) => {
  const contrastMark = () => {
    if (conrastRatio >= 12) return 'Great';
    if (conrastRatio >= 7) return 'Good';
    return 'Poor';
  };
  const additionalParam = (value) => {
    return (value + 0.055) / 1.055;
  };
  const getParam = (value) => {
    return value <= 0.03928
      ? value / 12.92
      : Math.pow(additionalParam(value), 2.4);
  };
  const getRGB = (hex) => {
    // const arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)].map((el) =>
    //   hexToDec(el)
    // );
    // let R, G, B;
    // const Rsrgb = arr[0] / 255;
    // const Gsrgb = arr[1] / 255;
    // const Bsrgb = arr[2] / 255;
    // R = getParam(Rsrgb);
    // G = getParam(Gsrgb);
    // B = getParam(Bsrgb);
    // return [R, G, B];
    const arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)].map(
      (el) => hexToDec(el) / 255
    );
    return arr.map((el) => getParam(el));
  };
  const getLuminance = (color) => {
    const rgbArr = getRGB(color);
    const Luminance =
      rgbArr[0] * 0.2126 + rgbArr[1] * 0.7152 + rgbArr[2] * 0.0722;
    return Luminance;
  };
  const getRatio = () => {
    const Lum1 = getLuminance(colour),
      Lum2 = getLuminance(bgrColour);
    const L1 = Math.max(Lum1, Lum2);
    const L2 = Math.min(Lum1, Lum2);
    return (L1 + 0.05) / (L2 + 0.05);
  };
  const [conrastRatio, setContrastRatio] = useState(getRatio());
  const [conrastMark, setContrastMark] = useState(getRatio());
  useEffect(() => {
    setContrastRatio(getRatio());
    setContrastMark(contrastMark());
  }, [colour, bgrColour]);
  return (
    <div className={classes.wrapper}>
      <div
        className={classes[`ContrastCard`] + ' ' + classes[`${conrastMark}`]}
      >
        <div className={classes.info}>Contrast</div>
        <div className={classes.value}>
          {conrastRatio % 1 === 0 ? conrastRatio : conrastRatio.toFixed(1)}
        </div>
        <div className={classes.desc}>{conrastMark}</div>
      </div>
      <Card title="Large text" ratio={conrastRatio} AA="3" AAA="4.5" />
      <Card title="Standard text" ratio={conrastRatio} AA="4.5" AAA="7" />
    </div>
  );
};
export default ContrastField;
