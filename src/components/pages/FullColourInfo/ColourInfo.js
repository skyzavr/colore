import classes from './ColourInfo.module.css';
import ContrastSet from './constrastSet/ContrastSet';
import Info from './infoGroup/Info';
import Sets from './sets/Sets';
import ShortInfo from './shortInfo/ShortInfo';

const ColourInfo = ({ colour = '#F9E3CC' }) => {
  return (
    <div className={classes.wrapper}>
      <Info colour={colour} />
      <ShortInfo colour={colour} />
      <Sets colour={colour} />
      <ContrastSet colour={colour} />
    </div>
  );
};
export default ColourInfo;
