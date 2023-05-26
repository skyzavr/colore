import { useState } from 'react';
import classes from './sets.module.css';

const Sets = ({ colour }) => {
  const [colourSets, setColourSets] = useState({
    Tints: [1, 2, 3, 4, 5, 6, 7, 8],
    Shades: [1, 2, 3, 4, 5, 6, 7, 8],
    Tones: [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by green': [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by red': [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by blue': [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by  red and green': [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by red and blue': [1, 2, 3, 4, 5, 6, 7, 8],
    'Blends by  green and blue': [1, 2, 3, 4, 5, 6, 7, 8],
  });
  return (
    <div className={classes.wrapper}>
      {Object.entries(colourSets).map((el) => (
        <div className={classes.set} key={el[0]}>
          <div className={classes.title}>{el[0]}</div>
          <div className={classes.list}>
            {el[1].map((value) => (
              <div key={el[0] + value} className={classes.listItem}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Sets;
