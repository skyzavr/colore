import classes from './ModalWindow.module.css';
const Modal = ({ children, style, onClose }) => {
  const { width, height } = style;
  const onCLoseHandler = () => {
    onClose();
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.back} onClick={onCLoseHandler}></div>
      <div className={classes.modal} style={{ width: width, height: height }}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
