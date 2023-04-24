import { useState, useRef, useEffect } from 'react';
import classes from './LinkMenu.module.css';

const LinkMenu = () => {
  const menuList = [
    { id: '01', value: 'paletteGen', title: 'Palette Generator' },
    { id: '02', value: 'colourConv', title: 'Colour converter' },
    { id: '03', value: 'ContrastCheck', title: 'Contrast Checker' },
    { id: '04', value: 'ImagePalette', title: 'Colour palette from image' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState('Tools');
  const titleRef = useRef(null);
  const menuRef = useRef(null);
  const dropDownHandler = () => setIsMenuOpen((prev) => !prev);
  const menuElementHandler = (el) => {
    setMenuTitle(el);
    dropDownHandler();
  };
  const clickOutsideHandler = (event) => {
    if (!isMenuOpen) return;
    /* if menu is open and we clicked outside the menu */
    const clickedInside = menuRef.current.contains(event.target);
    if (clickedInside) menuElementHandler(event.target.innerHTML);
    if (!clickedInside) dropDownHandler();
  };
  useEffect(() => {
    window.addEventListener('mousedown', clickOutsideHandler);
    return () => window.removeEventListener('mousedown', clickOutsideHandler);
  }, [isMenuOpen]);
  return (
    <div className={classes.menuWrapper}>
      {/* dropdown title */}

      <div className={classes.title} onClick={dropDownHandler} ref={titleRef}>
        {menuTitle}
        <span
          className={classes[`${isMenuOpen ? 'upArrow' : 'downArrow'}`]}
        ></span>
      </div>

      {/* dropdown itself */}
      {isMenuOpen && (
        <ul
          className={classes.dropdown}
          style={{
            left: `${titleRef.current?.offsetLeft}px`,
            top: `${titleRef.current?.offsetTop + 30}px`,
          }}
          ref={menuRef}
        >
          {menuList.map((el) => (
            <li key={el.id} value={el.value}>
              {el.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default LinkMenu;
