import classes from './notFound.module.css';
import { useNavigate } from 'react-router-dom';

import Button from '../../ui/btn/button/Button';
const NotFound = () => {
  const navigate = useNavigate();
  const homeHandler = () => {
    navigate('/');
  };
  return (
    <div>
      <div className={classes.title}>Oops</div>
      <div className={classes.desc}>Something went wrong</div>
      <div className={classes.btn}>
        <Button text="Go Home" type="border" onClickFunc={homeHandler} />
      </div>
    </div>
  );
};
export default NotFound;
