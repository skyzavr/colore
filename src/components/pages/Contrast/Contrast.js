import { useState } from 'react';
import InputColour from '../../ui/inputColour/InputColour';
import classes from './Contrast.module.css';
import ContrastField from './contrastInfo/CardsField/ContrastField';
import TextInput from './inputTextArea/TextInput';
import UserContrastCard from './userContrastCard/UserContrastCard';

const Contrast = ({ title }) => {
  const [colour, setColour] = useState('#242627');
  const [bgr, setBgr] = useState('#3787FF');
  const [text, setText] = useState(
    'No matter what, you keep finding something to fight for'
  );
  const setTextArea = (data) => {
    setText(data);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.contrastInfo}>
        <div className={classes.title}>{title}</div>
        <div className={classes.info}>
          <p>
            Check the contrast of the text colour and the background colour.
            Choose a background color and a text color to check it out.
          </p>
          <p>You can see it in our random text or enter your own. </p>
          <p>
            You can also generate a color to achieve better results. You can
            also lock the color and generate the desired one.
          </p>
        </div>
        {/* Cards that shows how bad/good contrast is */}
        <ContrastField colour={colour} bgrColour={bgr} />
      </div>
      <div className={classes.contrast}>
        <div className={classes.InputField}>
          <div className={classes.colourInputField}>
            <InputColour
              onSetCOlour={(data) => setColour(data)}
              text="Text colour"
              inpColour={colour}
            />
            <InputColour
              onSetCOlour={(data) => setBgr(data)}
              text="Background colour"
              inpColour={bgr}
            />
          </div>
          <TextInput onSetText={setTextArea} />
        </div>
        {/* UserContrastCard - based on user's colours and text  */}
        <UserContrastCard textColour={colour} bgrColour={bgr} text={text} />
      </div>
    </div>
  );
};
export default Contrast;
