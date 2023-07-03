import Button from '../../../../ui/btn/button/Button';
import InputColour from '../../../../ui/inputColour/InputColour';
import Modal from '../../../../ui/modalWindow/ModalWindow';
import classes from './newCardWindow.module.css';
const NewCardWindow = ({
  colour,
  onSetNewColour,
  addNewColour,
  addNewColourHandler,
}) => {
  const modalWindow = {
    width: '300px',
    height: '350px',
  };
  return (
    <Modal style={modalWindow}>
      <div className={classes.title}>Add new colour</div>
      <InputColour colour={colour} onSetColour={onSetNewColour} />
      <Button onClickFunc={addNewColour} text="Add card" type="fill" />
      <Button onClickFunc={addNewColourHandler} text="Cancel" type="none" />
    </Modal>
  );
};
export default NewCardWindow;
