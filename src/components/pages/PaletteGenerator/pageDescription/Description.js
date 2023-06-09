import FillIcon from '../../../ui/Icons/FillIcon';
import GenerateIcon from '../../../ui/Icons/GenerateIcon';
import LockIcon from '../../../ui/Icons/LockIcon';
import SaveIcon from '../../../ui/Icons/SaveIcon';
import classes from './description.module.css';
const Descirption = () => {
  const descList = [
    {
      text: 'You can generate colors separate way or all together',
      icon: <GenerateIcon />,
      id: Math.floor(Math.random() * 10000),
    },
    {
      text: 'You can select a color using the color picker',
      icon: <FillIcon />,
      id: Math.floor(Math.random() * 10000),
    },
    {
      text: 'You can lock any colour and it wont be generated.',
      icon: <LockIcon />,
      id: Math.floor(Math.random() * 10000),
    },
    {
      text: 'The colors or the entire palette can be saved',
      icon: <SaveIcon />,
      id: Math.floor(Math.random() * 10000),
    },
  ];
  return (
    <div className={classes.descirption}>
      {descList.map((el) => (
        <div className={classes.descItem} key={el.id}>
          <div className={classes.icon}>{el.icon}</div>
          <div className={classes.text}>{el.text}</div>
        </div>
      ))}
    </div>
  );
};
export default Descirption;
