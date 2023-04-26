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
    const Btn = btnRef.current.contains(event.target);
    if (!clickedInside && !Btn) menuHandler();
  };
  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? 'hidden' : 'scroll';
    window.addEventListener('mousedown', clickMenuHandler);
    return () => {
      document.body.style.overflowY = 'scroll';
      window.removeEventListener('mousedown', clickMenuHandler);
    };
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
          <div style={{ display: 'inline-block' }} ref={menuRef}>
            <ul>
              <ListUl list={menuList} clickHandler={menuHandler} />
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
