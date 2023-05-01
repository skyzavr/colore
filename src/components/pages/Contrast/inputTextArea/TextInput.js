import { useState } from 'react';
import classes from './TextInput.module.css';
const TextInput = ({ onSetText }) => {
  const quote = 'No matter what, you keep finding something to fight for';
  const [text, setText] = useState(quote);
  const updateTextHandler = (event) => {
    setText(event.target.value);
    onSetText(event.target.value);
  };
  return (
    <div className={classes.textInputField}>
      <label htmlFor="text">Your text</label>
      <input id="text" type="text" value={text} onChange={updateTextHandler} />
    </div>
  );
};
export default TextInput;
