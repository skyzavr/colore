import { useEffect, useState } from 'react';
import InputColour from '../../../ui/inputColour/InputColour';
import classes from './convField.module.css';
import Card from './Card/Card';
import {
  getRGB,
  rgbToHSL,
  rgbToCMyk,
  hslToRgb,
  HexByRgb,
  cmykToRgb,
} from '../../../../convertFunctions';

const ConvField = ({ newColor, onUpdateColour }) => {
  const [colour, setColour] = useState(newColor);
  const [colourList, setColourList] = useState(updateListHandler(newColor));
  const UpdateColour = (data) => {
    setColour(data);
    onUpdateColour(data);
  };

  function updateListHandler(colour) {
    const [r, g, b] = getRGB(colour);
    const [h, s, l] = rgbToHSL([r, g, b]);
    const [c, m, y, k] = rgbToCMyk([r, g, b]);
    return [
      { title: 'RGB', params: [r, g, b], maxValue: [255, 255, 255] },
      { title: 'HSL', params: [h, s, l], maxValue: [360, 100, 100] },
      { title: 'CMYK', params: [c, m, y, k], maxValue: [100, 100, 100, 100] },
    ];
  }
  const onUpdateList = (data) => {
    const { type, dupList: list } = data;
    let color = '';
    if (type === 'RGB') color = HexByRgb(list);
    else if (type === 'HSL') color = HexByRgb(hslToRgb(list));
    else color = HexByRgb(cmykToRgb(list));
    setColour(color);
    setColourList(updateListHandler(color));
    onUpdateColour(color);
  };
  useEffect(() => {
    setColour(newColor);
    setColourList(updateListHandler(newColor));
  }, [newColor]);
  return (
    <div>
      <InputColour onSetColour={UpdateColour} colour={colour} />
      <div className={classes.field}>
        <Card
          valueList={colourList[0]}
          onUpdateValueListHandler={onUpdateList}
        />
        <Card
          valueList={colourList[1]}
          onUpdateValueListHandler={onUpdateList}
        />
        <Card
          valueList={colourList[2]}
          onUpdateValueListHandler={onUpdateList}
        />
      </div>
    </div>
  );
};
export default ConvField;
