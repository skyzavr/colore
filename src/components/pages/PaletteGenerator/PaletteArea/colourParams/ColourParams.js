import classes from './colourParams.module.css';
import GenerateIcon from '../../../../ui/Icons/GenerateIcon';
import LockIcon from '../../../../ui/Icons/LockIcon';
import DeleteIcon from '../../../../ui/Icons/DeleteIcon';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ColourParams = ({ id, colour, onUpdateData }) => {
  const btns = [
    {
      comp: <GenerateIcon />,
      type: 'generate',
      tip: 'click here to generate new colour',
    },
    {
      comp: <LockIcon />,
      type: 'lock',
      tip: 'click here to lock colour',
    },

    {
      comp: <DeleteIcon />,
      type: 'delete',
      tip: 'it will remmove this colour',
    },
    {
      comp: '?',
      type: 'moreInfo',
      tip: 'click to see more info about colour',
    },
  ];
  const [params, setParams] = useState({
    generate: false,
    lock: false,
    delete: false,
    moreInfo: false,
  });
  const onClickHandler = (data) => {
    onUpdateData({ id: id, type: data });
    if (['generate', 'delete', 'moreInfo'].some((el) => el === data)) return;
    const copyState = { ...params };
    if (data === 'lock') copyState.lock = !params.lock;
    setParams(copyState);
  };
  const setLocalStorageColour = (value) => {
    localStorage.setItem('colour', value);
  };
  return (
    <div className={classes.colourParams}>
      <div className={classes.colourName}>{colour}</div>
      <div className={classes.colourBtns}>
        {btns.map((btn) =>
          btn.type === 'moreInfo' ? (
            <Link
              target={'_blank'}
              to={'/ColourInfo'}
              onClick={() => setLocalStorageColour(colour)}
              key={Math.floor(Math.random() * 10000)}
            >
              <div className={classes.btnItem}>{btn.comp}</div>
            </Link>
          ) : (
            <div
              className={[
                `${classes.btnItem} ${
                  params[btn.type] ? classes.locked : classes.default
                }`,
              ]}
              onClick={() => onClickHandler(btn.type)}
              key={Math.floor(Math.random() * 10000)}
            >
              {btn.comp}
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default ColourParams;
