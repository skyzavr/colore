import { useContext, useEffect } from 'react';
import { useCopyClipboard } from '../../../hooks/useCopyClipboard';
import Notification from '../../ui/notification/Notification';
import classes from './ColourInfo.module.css';
import ContrastSet from './constrastSet/ContrastSet';
import Info from './infoGroup/Info';
import Sets from './sets/Sets';
import ShortInfo from './shortInfo/ShortInfo';
import { ColourContext } from '../../../App';

const ColourInfo = () => {
  const [copy] = useCopyClipboard();
  const color = localStorage.getItem('colour');
  useEffect(() => {
    copy(color, 'HEX', false);
  }, []);
  const { colour } = useContext(ColourContext);
  return (
    colour.colour && (
      <div className={classes.wrapper}>
        <Info colour={colour.colour} />
        <ShortInfo colour={colour.colour} />
        <Sets colour={colour.colour} />
        <ContrastSet colour={colour.colour} />
        {Object.entries(colour.colour).length !== 0 && (
          <Notification param={colour.colour} />
        )}
      </div>
    )
  );
};
export default ColourInfo;
