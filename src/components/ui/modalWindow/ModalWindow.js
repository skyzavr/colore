import classes from './ModalWindow.module.css';
const Modal = ({ children, style }) => {
  const { width, height } = style;
  return (
    <div className={classes.wrapper}>
      <div className={classes.modal} style={{ width: width, height: height }}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
