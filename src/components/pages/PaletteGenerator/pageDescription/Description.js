import GenerateIcon from '../../../ui/Icons/GenerateIcon';
import LockIcon from '../../../ui/Icons/LockIcon';
import classes from './description.module.css';
const Descirption = () => {
  const descList = [
    {
      text: 'You can generate colors separate way or all together',
      icon: <GenerateIcon />,
      id: Math.floor(Math.random() * 10000),
    },
    {
      text: 'You can lock any colour and it wont be generated.',
      icon: <LockIcon />,
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
