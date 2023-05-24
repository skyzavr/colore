import { useEffect, useState } from 'react';
import classes from './Notification.module.css';
import { Error } from './icons/Error';
import { Success } from './icons/Success';
const Notification = ({ param }) => {
  const notHeight = 40;
  const { message, type, id } = param;
  const [isShow, setIsShow] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [inteval, setIntervalId] = useState();
  const [width, setWidth] = useState(window.innerWidth - 20);

  const setWidthNot = () => {
    setWidth(window.innerWidth - 20);
  };

  const startInterval = () => {
    setOpacity(1);
    setIsShow(true);
    let int = setInterval(() => {
      setOpacity((prev) => {
        if (prev > 0.9) return prev - 0.0005;
        else if (prev > 0.7) return prev - 0.005;
        else if (prev > 0.6) return prev - 0.01;
        else if (prev > 0) return prev - 0.05;
        clearInterval(int);
        return prev;
      });
      setIntervalId(int);
    }, 20);
  };
  const stopInteval = () => {
    setIsShow(false);
    clearInterval(inteval);
  };
  useEffect(() => {
    setWidthNot();
    startInterval();
  }, [message, type, id]);
  useEffect(() => {
    if (opacity <= 0) stopInteval();
  }, [opacity]);
  return (
    <div className={classes.wrapper}>
      {isShow && (
        <div
          className={`${classes.notification} ${classes[`${type}`]}`}
          onClick={stopInteval}
          style={{ opacity: `${opacity}`, height: `${notHeight}px` }}
        >
          {width >= 360 && (
            <div className={classes.icon}>
              {type === 'success' ? <Success /> : <Error />}
            </div>
          )}
          <div className={classes.text}>{message}</div>
        </div>
      )}
    </div>
  );
};
export default Notification;
