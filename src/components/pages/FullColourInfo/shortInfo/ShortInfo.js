import classes from './shortInfo.module.css';
import { rgbToHSL, getRGB, rgbToCMyk } from '../../../../convertFunctions';

import { useState, useEffect } from 'react';
import ListOfConvertedValues from './convertedValuesField/ListOfConvertedValues';
const ShortInfo = ({ colour }) => {
  const [colourSystems, setColourSystems] = useState({ hex: colour });
  const getAllColoursSystemValues = () => {
    const RGB = getRGB(colour);
    const CMYK = rgbToCMyk(RGB);
    const HSL = rgbToHSL(RGB);
    setColourSystems({
      HEX: colour,
      HSL: `${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%`,
      CMYK: `${CMYK[0]}, ${CMYK[1]}, ${CMYK[2]}, ${CMYK[3]}`,
      RGB: `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`,
    });
  };
  const systems = ['HEX', 'HSL', 'CMYK', 'RGB'];
  useEffect(() => {
    getAllColoursSystemValues();
  }, [colour]);
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.colouredCard}
        style={{ backgroundColor: `${colour}` }}
      ></div>
      <ListOfConvertedValues ValuesList={colourSystems} TitlesList={systems} />
    </div>
  );
};
export default ShortInfo;
