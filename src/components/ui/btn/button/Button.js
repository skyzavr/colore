import classes from './Button.module.css';
const Button = ({ text, onClickFunc, type = 'none', children }) => {
  return (
    <button onClick={onClickFunc} className={`${classes.btn} ${classes[type]}`}>
      {text}
      <div className={classes.icon}>{children}</div>
    </button>
  );
};
export default Button;
