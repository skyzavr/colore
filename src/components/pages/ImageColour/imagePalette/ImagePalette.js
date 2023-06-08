import { useEffect, useState } from 'react';
import { decimalToHex, rgbToSl } from '../../../../convertFunctions';
import classes from './ImagePalette.module.css';
import ColourCardList from './list/ColourCardList';
import ColourSwitching from './ColourSwitching/ColourSwitching';

const ImagePalette = ({ rgbList }) => {
  const [lightColours, setLightColours] = useState([]);
  const [darkColours, setDarkColours] = useState([]);
  const [colouredList, setColouredList] = useState([]);
  const [coloured, setColoured] = useState([]);
  const sortRgb = (list, param) => {
    return list.sort(function (a, b) {
      if (a[param] < b[param]) {
        return 1;
      }
      if (a[param] > b[param]) {
        return -1;
      }
      return 0;
    });
  };
  const medianCut = (list, depth) => {
    /*Algorythm of median cut
    1) using biggestColourRange method we are getting the biggest range of colour channels (red or green or blue)
    2)Every time in our recursion we will sort array by its channel (red or green or blue)
    3) dividing array in a half
    4)repeat it (1-3 steps) untill we reach our max depth
    5) in the end we'll get kinda 256 arrays (because of depth=8, 2^8=256)
    6) for each array we will calculate the avarage value of rgb
    */
    const maxDepth = 12;
    if (depth === maxDepth) {
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < list.length; i++) {
        r += list[i].r;
        g += list[i].g;
        b += list[i].b;
      }
      r = (r / list.length).toFixed(0);
      g = (g / list.length).toFixed(0);
      b = (b / list.length).toFixed(0);
      const hex = '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
      const sl = rgbToSl(r, g, b);
      return [
        {
          r: Number(r),
          g: Number(g),
          b: Number(b),
          hex: hex,
          sat: Math.floor(sl[0] * 100),
          lum: Math.floor(sl[1] * 100),
        },
      ];
    } else {
      let range = biggestColourRange(list);
      sortRgb(list, range);
      let middle = list.length / 2;
      return [
        ...medianCut(list.slice(0, middle), depth + 1),
        ...medianCut(list.slice(middle + 1), depth + 1),
      ];
    }
  };
  const biggestColourRange = (list) => {
    let rMin = 255,
      gMin = 255,
      bMin = 255;
    let rMax = 0,
      gMax = 0,
      bMax = 0;
    list.forEach((element) => {
      rMax = Math.max(element.r > rMax);
      gMax = Math.max(element.g > gMax);
      bMax = Math.max(element.b > bMax);
      rMin = Math.min(element.r < rMin);
      gMin = Math.min(element.g < rMin);
      bMin = Math.min(element.b < rMin);
    });
    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
    if (rRange > gRange && rRange > bRange) return 'r';
    else if (gRange > rRange && gRange > bRange) return 'g';
    else return 'b';
  };
  const uniqueList = (list) => {
    if (list.length === 0) return;
    const unique = [];
    const newArray = [];
    for (let i = 0; i < list.length; i++) {
      if (!unique.includes(list[i].hex)) {
        unique.push(list[i].hex);
        newArray.push(list[i]);
      }
    }
    return newArray;
  };
  const getLightColours = (list) => {
    const lightList = [];
    for (let i = 0; i < list.length; i++) {
      let lum = list[i].lum;
      if (lum > 75) lightList.push(list[i].hex);
    }
    return lightList;
  };
  const getDarkColours = (list) => {
    const darkList = [];
    for (let i = 0; i < list.length; i++) {
      let lum = list[i].lum;
      if (lum < 8.5) darkList.push(list[i].hex);
    }
    return darkList;
  };
  const updateObj = (obj, objName, value) => {
    return {
      r: obj[`${objName}`] ? obj[`${objName}`].r + value.r : value.r,
      g: obj[`${objName}`] ? obj[`${objName}`].g + value.g : value.g,
      b: obj[`${objName}`] ? obj[`${objName}`].b + value.b : value.b,
      len: obj[`${objName}`] ? obj[`${objName}`].len + 1 : 1,
    };
  };
  const getAvgRgb = (list, first, second, third) => {
    const obj = {};
    const one = 85,
      two = 169,
      three = 255;
    for (let i = 0; i < list.length; i++) {
      let channelOne = list[i][`${first}`],
        channelTwo = list[i][`${second}`],
        channelThree = list[i][`${third}`];
      let key = '';
      if (channelOne < one) key = 'OneOneOne';
      else if (channelOne < two) {
        if (channelTwo < one && channelThree < one) key = 'TwoOneOne';
        else if (channelTwo < one && channelThree < two) key = 'TwoOneTwo';
        else if (channelTwo < two && channelThree < one) key = 'TwoTwoOne';
        else key = 'TwoTwoTwo';
      } else if (channelOne < three) {
        if (channelTwo < one) {
          if (channelThree < one) key = 'ThreeOneOne';
          else if (channelThree < two) key = 'ThreeOneTwo';
          else key = 'ThreeOneThree';
        } else if (channelTwo < two) {
          if (channelThree < one) key = 'ThreeTwoOne';
          else if (channelThree < two) key = 'ThreeTwoTwo';
          else key = 'ThreeTwoThree';
        } else {
          if (channelThree < one) key = 'ThreeThreeOne';
          else if (channelThree < two) key = 'ThreeThreeTwo';
          else key = 'ThreeThreeThree';
        }
      }
      obj[`${key}`] = updateObj(obj, key, list[i]);
    }
    const Values = [];
    for (const value in obj) {
      let val = obj[`${value}`];
      if (val.len !== 0) {
        let r = Math.floor(val.r / val.len),
          g = Math.floor(val.g / val.len),
          b = Math.floor(val.b / val.len),
          hex = '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
        Values.push(hex);
      }
    }
    return Values;
  };
  const getColouredColours = (list, light, dark) => {
    const red = [];
    const green = [];
    const blue = [];
    const colourList = [];
    const arr = [...light, ...dark];
    for (let i = 0; i < list.length; i++) {
      if (!arr.includes(list[i].hex) && list[i].sat > 10)
        colourList.push(list[i].hex);
      if (list[i].r > list[i].g && list[i].r > list[i].b) red.push(list[i]);
      if (list[i].g > list[i].r && list[i].g > list[i].b) green.push(list[i]);
      if (list[i].b > list[i].r && list[i].b > list[i].g) blue.push(list[i]);
    }
    const redValues = getAvgRgb(red, 'r', 'g', 'b');
    const greenValues = getAvgRgb(green, 'g', 'r', 'b');
    const blueValues = getAvgRgb(blue, 'b', 'r', 'g');
    setColoured(colourList);
    setColouredList([...redValues, ...blueValues, ...greenValues]);
  };
  const calculatePalette = () => {
    if (rgbList.length === 0) return;
    const list = uniqueList(medianCut(rgbList, 0));
    const lightList = getLightColours(list);
    const darkList = getDarkColours(list);
    getColouredColours(list, lightList, darkList);
    setDarkColours(darkList);
    setLightColours(lightList);
  };
  useEffect(() => {
    calculatePalette();
  }, [rgbList]);
  return (
    <div className={classes.colourWrapper}>
      {colouredList.length > 0 && (
        <div className={classes.wrapper}>
          <div className={classes.colourOverview}>
            <div className={classes.title}>We chose these colours for you</div>
            <ColourCardList list={colouredList} length={10} />
          </div>
        </div>
      )}
      {colouredList.length > 0 && (
        <ColourSwitching
          light={lightColours}
          dark={darkColours}
          coloured={coloured}
        />
      )}
    </div>
  );
};
export default ImagePalette;
