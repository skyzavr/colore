import classes from './List.module.css';
const ListUl = ({ list }) => {
  //todo: add routing here
  return list.map((el) => (
    <li key={el.id} value={el.value}>
      {el.title}
    </li>
  ));
};
export default ListUl;
