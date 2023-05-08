import classes from './UserContrastCard.module.css';
const UserContrastCard = ({ textColour, bgrColour, text }) => {
  const randomNumber = () => {
    const max = 9999;
    const min = 555;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  return (
    <div className={classes.card} style={{ backgroundColor: `${bgrColour}` }}>
      <div className={classes.title} style={{ color: `${textColour}` }}>
        Quote #{randomNumber()}
      </div>
      <div className={classes.text} style={{ color: `${textColour}` }}>
        {text}
      </div>
      <div className={classes.sign} style={{ color: `${textColour}` }}>
        Jean Nicolas Arthur Rimbaud
      </div>
    </div>
  );
};
export default UserContrastCard;
