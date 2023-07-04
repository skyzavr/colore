import { useEffect, useState } from 'react';
import classes from './colourInputArea.module.css';
import { createPortal } from 'react-dom';
import Modal from '../../modalWindow/ModalWindow';
import Button from '../../btn/button/Button';
const ColourInputArea = ({ colour, updateColour, text }) => {
  const [value, setValue] = useState(colour);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const onChangeHandler = (data) => {
    clearErrors();
    let updateValue = data.target.value;
    updateValue.includes('#')
      ? setValue(updateValue)
      : setValue('#' + updateValue);
  };
  const modalWindow = {
    width: '300px',
    height: '350px',
  };
  const clearErrors = () => {
    setIsError(false);
    setErrorMsg('');
  };
  const errorHandling = () => {
    const length = value.includes('#') ? value.length - 1 : value.length;
    if (length !== 6) {
      setErrorMsg(
        'The value must contain 6 characters, i.e. numbers and letters A-F. For example, #38BDE3'
      );
      setIsError(true);
      return;
    }
    if (!/^[a-fA-F0-9#]+$/.test(value)) {
      setErrorMsg('The value must contain letters A to F and numbers');
      setIsError(true);
      return;
    }
    updateColour(value);
  };
  const onKeyUp = (e) => {
    if (e.key === 'Enter') errorHandling();
  };
  const onBlurHandler = () => {
    errorHandling();
  };
  useEffect(() => {
    setValue(colour);
  }, [colour]);
  return (
    <>
      {isError &&
        createPortal(
          <Modal style={modalWindow} onClose={clearErrors}>
            <div className={classes.title}>There is Error</div>
            <div className={classes.error}>{errorMsg}</div>
            <Button onClickFunc={clearErrors} text="Ok" type="none" />
          </Modal>,
          document.body
        )}
      <input
        id="colourInput"
        type="text"
        placeholder={text}
        value={value}
        className={classes.inputColour}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onKeyUp={(e) => onKeyUp(e)}
      />
    </>
  );
};
export default ColourInputArea;
