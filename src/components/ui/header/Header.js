import classes from './Header.module.css';
import Switch from './switch/Switch';

const Header = () => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.gitHubLink}>
          <a href="https://github.com/skyzavr/colore">GitHub</a>
        </div>
        <div className={classes.title}>Colore</div>
        <div className={classes.menu}>Here will be menu</div>
        <div className={classes.btns}>
          <div className={classes.themes}>
            <Switch />
          </div>
          <div className={classes.bookmarks}></div>
        </div>
      </div>
    </div>
  );
};
export default Header;
