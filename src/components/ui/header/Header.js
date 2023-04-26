import classes from './Header.module.css';
import Bookmarks from './Bookmarks';
import Switch from './switch/Switch';
import { useState, useEffect } from 'react';
import SmallMenu from './smallMenu/SmallMenu';
const Header = () => {
  const menuList = [
    { id: '01', value: 'paletteGen', title: 'Palette Generator' },
    { id: '02', value: 'colourConv', title: 'Colour converter' },
    { id: '03', value: 'ContrastCheck', title: 'Contrast Checker' },
    { id: '04', value: 'ImagePalette', title: 'Colour palette from image' },
  ];
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const resizeScreen = () => setWidthSize(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', resizeScreen);
    return () => window.removeEventListener('resize', resizeScreen);
  }, []);
  return (
    <header>
      <div className={classes.wrapper}>
        <div className={classes.title}>Colore</div>
        <div className={classes.menuWrapper}>
          {widthSize >= 700 && <Switch />}
          <div className={classes.Bookmarks}>
            <Bookmarks />
          </div>
          <SmallMenu width={widthSize} menuList={menuList}>
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
