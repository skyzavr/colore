import { useEffect, useState } from 'react';
import classes from './Contrast.module.css';
import ContrastField from './contrastInfo/CardsField/ContrastField';
import TextInput from './inputTextArea/TextInput';
import UserContrastCard from './userContrastCard/UserContrastCard';
import InputColour from '../../ui/inputColour/InputColour';
import { generateColour } from '../../../convertFunctions';

const Contrast = () => {
  const [colour, setColour] = useState(generateColour());
  const [bgr, setBgr] = useState(generateColour());
  const quote =
    'I found it — an eternity. This is the sun merged with the sea.';
  const [text, setText] = useState(quote);
  const setTextArea = (data) => setText(data);
  const newColourHandler = (data) => setColour(data);
  const newBgrHandler = (data) => setBgr(data);
  return (
    <div className={classes.wrapper}>
      <div className={classes.contrastInfo}>
        <div className={classes.title}>Contrast Checker</div>
        <div className={classes.info}>
          <p>
            Check the contrast of the text colour and the background colour.
            Choose a background color and a text color to check it out.
          </p>
          <p>You can see it in our text or enter your own. </p>
          <p>You can also generate a color.</p>
        </div>
        <ContrastField colour={colour} bgrColour={bgr} />
      </div>
      <div className={classes.contrast}>
        <div className={classes.InputField}>
          <div className={classes.colourInputField}>
            <InputColour colour={colour} onSetColour={newColourHandler} />
            <InputColour colour={bgr} onSetColour={newBgrHandler} />
          </div>
          <TextInput onSetText={setTextArea} quote={text} />
        </div>
        <UserContrastCard textColour={colour} bgrColour={bgr} text={text} />
      </div>
    </div>
  );
};
export default Contrast;
