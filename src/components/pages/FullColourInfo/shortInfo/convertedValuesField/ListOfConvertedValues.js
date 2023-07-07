import { useCopyClipboard } from '../../../../../hooks/useCopyClipboard';
import classes from './listOfConvertedValues.module.css';
const ListOfConvertedValues = ({ ValuesList, TitlesList }) => {
  const [copy] = useCopyClipboard();
  return (
    <div className={classes.container}>
      {TitlesList.map((el) => (
        <div className={classes.item} key={Math.floor(Math.random() * 10000)}>
          <div className={classes.systemName}>{el}:</div>
          <div
            className={classes.systemValue}
            onClick={() => copy(ValuesList[`${el}`], el)}
          >
            <span className={classes.tip}>Click to copy</span>
            {ValuesList[`${el}`]}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListOfConvertedValues;
