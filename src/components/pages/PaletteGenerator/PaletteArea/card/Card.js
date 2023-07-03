import ColourCard from '../colourCard/ColourCard';
import ColourParams from '../colourParams/ColourParams';
import ColourSet from '../colourSet/ColourSet';
import classes from './Card.module.css';
const Card = ({ onUpdate, elem }) => {
  const { colour, colourSet, id } = elem;
  const updatePassedData = (data) => {
    onUpdate(data);
  };
  return (
    <div className={classes.card}>
      <ColourCard colour={colour} />
      <ColourParams id={id} colour={colour} onUpdateData={updatePassedData} />
      <ColourSet colourSet={colourSet} />
    </div>
  );
};
export default Card;
