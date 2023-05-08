import { useState } from 'react';
import classes from './TextInput.module.css';
const TextInput = ({ onSetText, quote }) => {
  const [text, setText] = useState(quote);
  const updateTextHandler = (event) => {
    setText(event.target.value);
    onSetText(event.target.value);
  };
  return (
    <div className={classes.textInputField}>
      <label htmlFor="text">Your text</label>
      <input
        id="text"
        type="text"
        value={text}
        onChange={updateTextHandler}
        maxLength={140}
      />
    </div>
  );
};
export default TextInput;
