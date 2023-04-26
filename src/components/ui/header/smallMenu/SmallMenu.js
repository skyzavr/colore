import classes from './SmallMenu.module.css';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Switch from '../switch/Switch';
import ListUl from '../list/List';

const SmallMenu = ({ children, width, menuList }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const menuHandler = () => setIsMenuOpen((prev) => !prev);
  const clickMenuHandler = (event) => {
    if (!isMenuOpen) return;
    const clickedInside = menuRef.current.contains(event.target);
    const clickedMenuTitle = btnRef.current.contains(event.target);
    if (!clickedInside && !clickedMenuTitle) menuHandler();
  };
  useEffect(() => {
    window.addEventListener('mousedown', clickMenuHandler);
    return () => window.removeEventListener('mousedown', clickMenuHandler);
  }, [isMenuOpen]);
  return (
    <>
      <div className={classes.menuBtn} onClick={menuHandler} ref={btnRef}>
        <div
          className={classes[`${isMenuOpen ? 'topLineAct' : 'topLine'}`]}
        ></div>
        <div
          className={classes[`${isMenuOpen ? 'bottomLineAct' : 'bottomLine'}`]}
        ></div>
      </div>

      {createPortal(
        <div
          className={classes.menuMobile}
          style={{ left: `${isMenuOpen ? 0 : -1 * width}px` }}
        >
          <div ref={menuRef} style={{ display: 'inline-block' }}>
            <ul>
              <ListUl list={menuList} />
            </ul>
            <Switch />
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
export default SmallMenu;
