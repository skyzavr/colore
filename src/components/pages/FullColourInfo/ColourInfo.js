import { useContext } from 'react';
import { ColourContext } from '../../../App';
import Notification from '../../ui/notification/Notification';
import classes from './ColourInfo.module.css';
import ContrastSet from './constrastSet/ContrastSet';
import Info from './infoGroup/Info';
import Sets from './sets/Sets';
import ShortInfo from './shortInfo/ShortInfo';

const ColourInfo = ({ color = '#F08A2C' }) => {
  const { colour } = useContext(ColourContext);

  return (
    <div className={classes.wrapper}>
      <Info colour={color} />
      <ShortInfo colour={color} />
      <Sets colour={color} />
      <ContrastSet colour={color} />
      {Object.entries(colour).length !== 0 && <Notification param={colour} />}
    </div>
  );
};
export default ColourInfo;
