import { useEffect, useState } from 'react';
import classes from './inputNummber.module.css';
import { createPortal } from 'react-dom';
import Modal from '../../../../ui/modalWindow/ModalWindow';
import Button from '../../../../ui/btn/button/Button';
const InputNummber = ({ initialValue, onUpdateValue, ind, maxValue = 100 }) => {
  const [value, setValue] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [showError, setIsShowError] = useState(false);
  const modalWindow = {
    width: '300px',
    height: '350px',
  };
  const updateValue = (e) => {
    setValue(e.target.value);
  };
  const clearErrors = () => {
    setIsError(false);
    setErrorMsg('');
  };
  const setErrors = (msg) => {
    setErrorMsg(msg);
    setIsError(true);
    setIsShowError(true);
  };
  const errorHandling = () => {
    if (value.toString().trim() === '') {
      setErrors('The value can not be empty');
      return;
    }
    let curentValue = Number(value.toString().trim());
    if (curentValue < 0 || curentValue > maxValue) {
      setErrors(`The value must be between 0 and ${maxValue}`);
      return;
    }
    onUpdateValue({ ind: ind, el: value });
    setIsShowError(false);
  };
  const onKeyUp = (e) => {
    if (e.key === 'Enter') errorHandling();
  };
  const onBlurHandler = () => {
    errorHandling();
  };
  const onFocusHandler = () => {
    setIsShowError(false);
  };
  useEffect(() => {
    setValue(initialValue);
    setIsShowError(false);
  }, [initialValue]);
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
        type="number"
        value={value}
        className={`${classes.inputNumber} ${
          showError ? classes.errorInput : ''
        }`}
        onChange={updateValue}
        onBlur={onBlurHandler}
        onKeyUp={onKeyUp}
        onFocus={onFocusHandler}
      />
    </>
  );
};
export default InputNummber;
