import classes from './Header.module.css';
import Switch from './switch/Switch';
import { useState, useEffect } from 'react';
import SmallMenu from './smallMenu/SmallMenu';
import { Link } from 'react-router-dom';

const Header = ({ list }) => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const resizeScreen = () => setWidthSize(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', resizeScreen);
    return () => window.removeEventListener('resize', resizeScreen);
  }, []);
  return (
    <header>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <Link to="/">Colore</Link>
        </div>
        <div className={classes.menuWrapper}>
          <SmallMenu width={widthSize} menuList={list}>
            <div className={classes.gitHubLink}>
              <a href="https://github.com/skyzavr/colore">GitHub</a>
            </div>
          </SmallMenu>
        </div>
      </div>

      <hr className={classes.hr} />
    </header>
  );
};
export default Header;
