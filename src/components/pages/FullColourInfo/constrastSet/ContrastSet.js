import { useState, useEffect } from 'react';
import classes from './contrastSet.module.css';
import { RandomHSL, rgbToHex } from '../../../../convertFunctions';
import { useCalculateContrastRatio } from '../../../../hooks/useCalculateContrastRatio';

const ContrastSet = ({ colour }) => {
  const [listOfContrasts, setListOfContrasts] = useState([]);
  const [getRatio] = useCalculateContrastRatio();
  const getRange = (list, hueValue) => {
    if (list.length === 0) return true;
    const listOfValue = [...list, hueValue].sort((a, b) => a - b);
    for (let i = 0; i < listOfValue.length - 1; i++) {
      let value = Math.abs(listOfValue[i] - listOfValue[i + 1]);
      if (value < 30) return false;
    }
    return true;
  };
  const listOfCOlours = () => {
    const colours = [];
    const hueList = [];
    while (hueList.length !== 3) {
      let newColour = RandomHSL(colour);
      let hue = newColour[0];
      let isBigRange = getRange(hueList, hue);
      if (isBigRange) {
        hueList.push(hue);
        colours.push(newColour);
      }
    }
    return colours.map((el) => rgbToHex(el[0], el[1], el[2]));
  };
  const settingUp = (paramOne, paramTwo) => {
    const newList = [];
    let realList = Array.isArray(paramOne) ? paramOne.length : paramTwo.length;
    for (let i = 0; i < realList; i++) {
      newList.push({
        style: {
          color: Array.isArray(paramOne) ? paramOne[i] : paramOne,
          bgr: Array.isArray(paramTwo) ? paramTwo[i] : paramTwo,
        },
        ratio: Math.floor(
          getRatio(
            Array.isArray(paramOne) ? paramOne[i] : paramOne,
            Array.isArray(paramTwo) ? paramTwo[i] : paramTwo
          )
        ),
        id: Math.floor(Math.random() * 1000),
      });
    }
    return newList;
  };
  const updateListOfColours = () => {
    const backgroundList = listOfCOlours();
    const colourList = listOfCOlours();
    setListOfContrasts([
      ...settingUp(colourList, colour),
      ...settingUp(colour, backgroundList),
    ]);
  };
  useEffect(() => {
    updateListOfColours();
  }, [colour]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Take a look at these combinations</div>
      <div className={classes.list}>
        {listOfContrasts.map((el) => (
          <div className={classes.item} key={el.id}>
            <div style={{ background: el.style.bgr }} className={classes.card}>
              <div style={{ color: el.style.color }}>
                Contrast ratio {el.ratio}
              </div>
            </div>
            <div className={classes.cardInfo}>
              <div className={classes.row}>
                <div>Background Colour</div>
                <div>{el.style.bgr}</div>
              </div>
              <div className={classes.row}>
                <div>Font Colour</div>
                <div>{el.style.color}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContrastSet;
