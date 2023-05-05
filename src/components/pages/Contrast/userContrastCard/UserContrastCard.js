import { useEffect, useState } from 'react';
import classes from './UserContrastCard.module.css';
const UserContrastCard = ({ textColour, bgrColour, text }) => {
  const [randomQuote, setRandomQuote] = useState(5463);
  const [randomName, setRandomName] = useState('Joel');
  const names = [
    'Joel',
    'Arthur',
    'Regis',
    'John',
    'Victor',
    'Ghost',
    'Ezio',
    'Nate',
    'Hades',
    'Tyr',
  ];
  const randomNumber = () => {
    const max = 9999;
    const min = 555;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const randomNameGen = () => {
    const min = 0;
    const max = names.length - 1;
    return names[Math.floor(Math.random() * (max - min + 1) + min)];
  };
  useEffect(() => {
    setRandomQuote(randomNumber());
    setRandomName(randomNameGen());
  }, [textColour, bgrColour]);
  return (
    <div
      className={classes.cardField_Card}
      style={{ backgroundColor: `${bgrColour}` }}
    >
      <div
        className={classes.cardField_Title}
        style={{ color: `${textColour}` }}
      >
        Quote #{randomQuote}
      </div>
      <div
        className={classes.cardField_Text}
        style={{ color: `${textColour}` }}
      >
        {text}
      </div>
      <div
        className={classes.cardField_Sign}
        style={{ color: `${textColour}` }}
      >
        {randomName}
      </div>
    </div>
  );
};
export default UserContrastCard;
