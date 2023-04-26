import { NavLink } from 'react-router-dom';
import classes from './List.module.css';
const ListUl = ({ list, clickHandler }) => {
  return list.map((el) => (
    <li key={el.id} onClick={clickHandler}>
      <NavLink
        to={`${el.path}`}
        className={({ isActive }) =>
          isActive ? classes.current : classes.link
        }
      >
        {el.title}
      </NavLink>
    </li>
  ));
};
export default ListUl;
