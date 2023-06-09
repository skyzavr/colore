import classes from './palette.module.css';
import { useEffect, useState, useContext } from 'react';
import { ColourContext } from '../../../../App';
import { createPortal } from 'react-dom';
import {
  getRGB,
  rgbToHSL,
  rgbToCMyk,
  generateColour,
} from '../../../../convertFunctions';
import Button from '../../../ui/btn/button/Button';
import NewCardWindow from './modalWindowNewCard/NewCardWindow';
import Notification from '../../../ui/notification/Notification';
import PaletteInformation from './pageInformation/PaletteInformation';
import CardList from './cardList/CardList';

const Palette = () => {
  const { colour: color } = useContext(ColourContext);
  const maxAmountOfCards = 10;
  const [isAddCard, setIsAddCard] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [defaultCardList, setDefaultCardList] = useState([]);
  const [newColour, setNewColour] = useState('#ffffff');
  const addNewColourHandler = () => {
    setIsAddCard((isAddCard) => !isAddCard);
  };
  const createCardObj = (colour, isLocked) => {
    const [r, g, b] = getRGB(colour);
    const [h, s, l] = rgbToHSL([r, g, b]);
    const [c, m, y, k] = rgbToCMyk([r, g, b]);
    return {
      colour: colour.toUpperCase(),
      colourSet: {
        RGB: `${r}, ${g}, ${b}`,
        HSL: `${h}, ${s}, ${l}`,
        CMYK: `${c}, ${m}, ${y}, ${k}`,
      },
      isLocked: isLocked,
      id: Math.floor(Math.random() * 10000),
      key: Math.floor(Math.random() * 10000),
    };
  };
  const createCardsList = () => {
    const list = [];
    let cardAmount = 0;
    const totalCardAmount = 5;
    const colourList = [];
    while (cardAmount !== totalCardAmount) {
      let colour = generateColour();
      let isColourExistYet = colourList.includes(colour);
      if (!isColourExistYet) {
        cardAmount++;
        colourList.push(colour);
        list.push(createCardObj(colour, false));
      }
    }
    setCardList(list);
    setDefaultCardList(list);
  };
  const addNewColour = (colour, isLocked = false) => {
    const list = [...cardList];
    list.push(createCardObj(colour, isLocked));
    setCardList(list);
    addNewColourHandler();
  };
  const resetCardsHandler = () => setCardList(defaultCardList);
  const onSetNewColourHandler = (data) => setNewColour(data);
  const onUpdateListHandler = (data) => setCardList(data);
  const generateColours = () => {
    const list = [...cardList];
    for (let i = 0; i < list.length; i++) {
      if (list[i].isLocked) continue;
      list[i] = createCardObj(generateColour(), false);
    }
    setCardList(list);
  };
  useEffect(() => {
    createCardsList();
    setNewColour(generateColour());
  }, []);
  return (
    <div className={classes.cardField}>
      <PaletteInformation
        reset={resetCardsHandler}
        generate={generateColours}
      />
      <CardList
        onUpdateList={onUpdateListHandler}
        onCreateObj={createCardObj}
        list={cardList}
      />
      {cardList.length < maxAmountOfCards && (
        <div className={classes.createCard}>
          <Button
            text="Add Colour"
            type="border"
            onClickFunc={addNewColourHandler}
          />
        </div>
      )}
      {isAddCard &&
        createPortal(
          <NewCardWindow
            colour={newColour}
            onSetNewColour={onSetNewColourHandler}
            addNewColour={() => addNewColour(newColour, false, false)}
            addNewColourHandler={addNewColourHandler}
          />,
          document.body
        )}
      {Object.entries(color).length !== 0 &&
        createPortal(<Notification param={color} />, document.body)}
    </div>
  );
};
export default Palette;
