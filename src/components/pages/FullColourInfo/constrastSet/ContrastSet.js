import { useState } from 'react';
import classes from './contrastSet.module.css';
const ContrastSet = ({ colour }) => {
  const [listOfContrasts, setListOfContrasts] = useState([
    {
      style: { color: '#fff', backgroundColor: colour },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
    {
      style: { color: '#fff', backgroundColor: colour },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
    {
      style: { color: '#fff', backgroundColor: colour },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
    {
      style: { color: colour, backgroundColor: '#000' },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
    {
      style: { color: colour, backgroundColor: '#000' },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
    {
      style: { color: colour, backgroundColor: '#000' },
      ratio: '4.5',
      id: Math.floor(Math.random() * 1000),
    },
  ]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Take a look at these combinations</div>
      <div className={classes.list}>
        {listOfContrasts.map((el) => (
          <div className={classes.item} key={el.id}>
            <div style={el.style} className={classes.card}>
              <div>Contrast ratio {el.ratio}</div>
            </div>
            <div className={classes.cardInfo}>
              <div className={classes.row}>
                <div>Background Colour</div>
                <div>{el.style.backgroundColor}</div>
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
