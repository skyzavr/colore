import Button from '../../../../ui/btn/button/Button';
import classes from './newCardWindow.module.css';
const NewCardWindow = ({
  colour,
  onSetNewColour,
  addNewColour,
  addNewColourHandler,
}) => {
  const setColourHandler = (e) => {
    onSetNewColour(e.target.value);
  };
  return (
    <>
      <div className={classes.title}>Add new colour</div>
      <div className={classes.inputColourArea}>
        <input type="text" value={colour} className={classes.inputColour} />
        <input
          type="color"
          value={colour}
          style={{ color: colour }}
          onChange={(e) => setColourHandler(e)}
          className={classes.inputColourPicker}
        />
      </div>
      <Button onClickFunc={addNewColour} text="Add card" type="fill" />
      <Button
        onClickFunc={addNewColourHandler}
        text="Close modal"
        type="none"
      />
    </>
  );
};
export default NewCardWindow;
