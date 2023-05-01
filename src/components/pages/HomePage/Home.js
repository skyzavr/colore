import classes from './Home.module.css';
import Card from './cards/Card';
const Home = ({ cards }) => {
  return (
    <div className={classes.wrapper}>
      {cards.map((el) => (
        <Card title={el.title} comp={el.comp} key={el.id} path={el.path} />
      ))}
    </div>
  );
};
export default Home;
