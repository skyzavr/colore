import { useState } from 'react';
import { generateColour } from '../../../convertFunctions';
import classes from './colourConverter.module.css';
import Button from '../../ui/btn/button/Button';
import ConvField from './ConverterField/ConvField';
const ColourConverter = () => {
  const [colour, setColour] = useState(generateColour());
  const onGenerateColour = () => {
    setColour(generateColour());
  };
  const onUpdateColourHandler = (data) => {
    setColour(data);
  };
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.backContainer}
        style={{ backgroundColor: `${colour}` }}
      >
        <div className={classes.mainContainer}>
          <div className={classes.title}>Colour converter</div>
          <div className={classes.desc}>
            To convert a colour, change any value and it will automatically
            recalculate, or just choose a random colour!
          </div>
          <ConvField newColor={colour} onUpdateColour={onUpdateColourHandler} />
          <div className={classes.btn}>
            <Button
              text="Random colour"
              type="border"
              onClickFunc={onGenerateColour}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColourConverter;
