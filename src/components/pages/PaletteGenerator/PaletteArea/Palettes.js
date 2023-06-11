import DeleteIcon from '../../../ui/Icons/DeleteIcon';
import FillIcon from '../../../ui/Icons/FillIcon';
import GenerateIcon from '../../../ui/Icons/GenerateIcon';
import LockIcon from '../../../ui/Icons/LockIcon';
import SaveIcon from '../../../ui/Icons/SaveIcon';
import Button from '../../../ui/btn/button/Button';
import ColourCard from './colourCard/ColourCard';
import ColourParams from './colourParams/ColourParams';
import ColourSet from './colourSet/ColourSet';
import classes from './palette.module.css';

const Palette = () => {
  const MaxAmountOfCards = 15;
  const btns = [
    <GenerateIcon />,
    <LockIcon />,
    <FillIcon />,
    <SaveIcon />,
    <DeleteIcon />,
  ];
  const cards = [
    {
      colour: '#AEB2DF',
      colourSet: {
        RGB: '174, 178, 223',
        HSL: '235, 43, 78',
        CMYK: '22, 20, 0, 13',
      },
      isLocked: false,
      isSaved: true,
      isGenerate: true,
      id: 1,
      key: Math.floor(Math.random() * 10000),
    },
    {
      colour: '#AEB2DF',
      colourSet: {
        RGB: '174, 178, 223',
        HSL: '235, 43, 78',
        CMYK: '22, 20, 0, 13',
      },
      isLocked: false,
      isSaved: true,
      isGenerate: true,
      id: 1,
      key: Math.floor(Math.random() * 10000),
    },
    {
      colour: '#AEB2DF',
      colourSet: {
        RGB: '174, 178, 223',
        HSL: '235, 43, 78',
        CMYK: '22, 20, 0, 13',
      },
      isLocked: false,
      isSaved: true,
      isGenerate: true,
      id: 1,
      key: Math.floor(Math.random() * 10000),
    },
    {
      colour: '#AEB2DF',
      colourSet: {
        RGB: '174, 178, 223',
        HSL: '235, 43, 78',
        CMYK: '22, 20, 0, 13',
      },
      isLocked: false,
      isSaved: true,
      isGenerate: true,
      id: 1,
      key: Math.floor(Math.random() * 10000),
    },
    {
      colour: '#AEB2DF',
      colourSet: {
        RGB: '174, 178, 223',
        HSL: '235, 43, 78',
        CMYK: '22, 20, 0, 13',
      },
      isLocked: false,
      isSaved: true,
      isGenerate: true,
      id: 1,
      key: Math.floor(Math.random() * 10000),
    },
  ];
  return (
    <div className={classes.cardField}>
      <div className={classes.cardList}>
        {cards.map((el) => (
          <div className={classes.card} key={el.key}>
            <ColourCard colour={el.colour} />
            <ColourParams colour={el.colour} btns={btns} />
            <ColourSet colourSet={el.colourSet} />
          </div>
        ))}
      </div>
      <div className={classes.createCard}>
        <Button text="Add Colour" type="border" />
      </div>
    </div>
  );
};
export default Palette;
