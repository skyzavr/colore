import { useEffect, useState } from 'react';
import classes from './sets.module.css';
import { getRGB, decimalToHex } from '../../../../convertFunctions';

const Sets = ({ colour }) => {
  const [colourSets, setColourSets] = useState();
  const setsTitle = [
    'Tints',
    'Shades',
    'Tones',
    'Blends by red',
    'Blends by green',
    'Blends by blue',
    'Blends by red and green',
    'Blends by red and blue',
    'Blends by green and blue',
  ];

  const getFactor = () => {
    const len = 7;
    let step = Number((1 / len).toFixed(2));
    const steps = [];
    for (let i = 0; i < 1; i += step) {
      let value = Math.min(1, i);
      steps.push(Math.floor(value * 100) / 100);
    }
    const ind = steps.length - 1;
    if (steps[ind] < 1) steps[ind] = 1;
    return steps;
  };
  const tints = (rgb) => {
    const factor = getFactor();
    const tintList = [];
    for (let i = 0; i < factor.length; i++) {
      let R = Math.round(rgb[0] + (255 - rgb[0]) * factor[i]);
      let G = Math.round(rgb[1] + (255 - rgb[1]) * factor[i]);
      let B = Math.round(rgb[2] + (255 - rgb[2]) * factor[i]);
      tintList.push({ r: R, g: G, b: B });
    }
    return tintList;
  };
  const shades = (rgb) => {
    const factor = getFactor();
    const shadesList = [];
    for (let i = 0; i < factor.length; i++) {
      let R = Math.round(rgb[0] * (1 - factor[i]));
      let G = Math.round(rgb[1] * (1 - factor[i]));
      let B = Math.round(rgb[2] * (1 - factor[i]));
      shadesList.push({
        r: R,
        g: G,
        b: B,
      });
    }
    return shadesList;
  };
  const tones = (rgb) => {
    let R = Math.round(rgb[0]),
      G = Math.round(rgb[1]),
      B = Math.round(rgb[2]);
    const tonesList = [];
    tonesList.push({ r: R, g: G, b: B });
    for (let i = 0; i < 7; i++) {
      // fix this algorythm
      let newR = (128 - R) / 7;
      let newG = (128 - G) / 7;
      let newB = (128 - B) / 7;
      R = Math.floor(R + newR);
      G = Math.floor(G + newG);
      B = Math.floor(B + newB);
      tonesList.push({
        r: R,
        g: G,
        b: B,
        hex: decimalToHex(R) + decimalToHex(G) + decimalToHex(B),
      });
    }
    return tonesList;
  };
  const applyReduce = (arr) => {
    return arr.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.name]: item.value,
        }),
      {}
    );
  };
  const blends = (len, colour, list) => {
    const obj = [...colour];
    const blendList = [];
    blendList.push(applyReduce([...obj, ...list]));
    for (let i = 0; i < obj.length; i++) {
      let diff = Math.round((obj[i].value - 128) / len);
      let obj1 = { ...obj[i], diff: diff };
      obj[i] = obj1;
    }
    for (let i = 0; i < len; i++) {
      const arr = [];
      for (let j = 0; j < obj.length; j++) {
        let diff = obj[j].diff;
        let n = obj[j].name;
        let val = obj[j].value - diff;
        obj[j] = { name: n, value: val, diff: diff };
        arr.push({ name: n, value: val });
      }
      blendList.push(applyReduce([...arr, ...list]));
    }
    return blendList;
  };
  const updateSets = () => {
    const rgb = getRGB(colour);
    let r = rgb[0],
      g = rgb[1],
      b = rgb[2];
    const newList = [];
    newList.push(tints(rgb));
    newList.push(shades(rgb));
    newList.push(tones(rgb));
    const blendSets = [
      [
        7,
        [{ name: 'r', value: r }],
        [
          { name: 'g', value: g },
          { name: 'b', value: b },
        ],
      ],
      [
        7,
        [{ name: 'g', value: g }],
        [
          { name: 'r', value: r },
          { name: 'b', value: b },
        ],
      ],
      [
        7,
        [{ name: 'b', value: b }],
        [
          { name: 'g', value: g },
          { name: 'r', value: r },
        ],
      ],

      [
        7,
        [
          { name: 'r', value: r },
          { name: 'g', value: g },
        ],
        [{ name: 'b', value: b }],
      ],
      [
        7,
        [
          { name: 'r', value: r },

          { name: 'b', value: b },
        ],
        [{ name: 'g', value: g }],
      ],
      [
        7,
        [
          { name: 'g', value: g },
          { name: 'b', value: b },
        ],
        [{ name: 'r', value: r }],
      ],
    ];
    for (let i = 0; i < blendSets.length; i++) {
      newList.push(blends(...blendSets[i]));
    }
    setColourSets((prev) => (prev = newList));
  };

  useEffect(() => {
    updateSets();
  }, [colour]);
  return (
    <div className={classes.wrapper}>
      {colourSets &&
        colourSets.map((el, ind) => (
          <div className={classes.set} key={Math.floor(Math.random() * 1000)}>
            <div className={classes.title}>{setsTitle[ind]}</div>
            <div
              className={classes.list}
              key={Math.floor(Math.random() * 1000)}
            >
              {el.map((val) => (
                <div
                  style={{ background: `rgb(${val.r},${val.g},${val.b})` }}
                  className={classes.listItem}
                  key={Math.floor(Math.random() * 1000)}
                ></div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Sets;
