import { useState, useEffect } from 'react';
import Card from '../contrastCard/Card';
import classes from './ContrastField.module.css';
import { useCalculateContrastRatio } from '../../../../../hooks/useCalculateContrastRatio';
const ContrastField = ({ colour, bgrColour }) => {
  const [getRatio] = useCalculateContrastRatio();
  const contrastMarkHandler = () => {
    if (contrastRatio >= 12) return 'Great';
    if (contrastRatio >= 7) return 'Good';
    return 'Poor';
  };
  const [contrastRatio, setContrastRatio] = useState(
    getRatio(colour, bgrColour)
  );
  const [contrastMark, setContrastMark] = useState(getRatio(colour, bgrColour));
  useEffect(() => {
    setContrastRatio(getRatio(colour, bgrColour));
    setContrastMark(contrastMarkHandler());
  }, [colour, bgrColour]);
  return (
    <div className={classes.wrapper}>
      <div
        className={classes[`ContrastCard`] + ' ' + classes[`${contrastMark}`]}
      >
        <div className={classes.info}>Contrast</div>
        <div className={classes.value}>{contrastRatio.toFixed(1)}</div>
        <div className={classes.desc}>{contrastMark}</div>
      </div>
      <Card title="Large text" ratio={contrastRatio} AA="3" AAA="4.5" />
      <Card title="Standard text" ratio={contrastRatio} AA="4.5" AAA="7" />
    </div>
  );
};
export default ContrastField;
