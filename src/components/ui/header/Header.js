import classes from './Header.module.css';
import Bookmarks from './Bookmarks';
import Switch from './switch/Switch';
import LinkMenu from './menu/LinkMenu';

const Header = () => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.gitHubLink}>
          <a href="https://github.com/skyzavr/colore">GitHub</a>
        </div>
        <div className={classes.title}>Colore</div>
        <div className={classes.menu}>
          <LinkMenu />
        </div>
        <div className={classes.btns}>
          <div className={classes.themes}>
            <Switch />
          </div>
          <div className={classes.bookmarks}>
            <Bookmarks />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
