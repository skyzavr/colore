import classes from './Home.module.css';
import ColourConv from './imgComponents/ColourConv';
import ContrastChecker from './imgComponents/ContrastCheck';
import ImgPalette from './imgComponents/ImgPalette';
import PalleteGen from './imgComponents/PaletteGen';
import Card from './cards/Card';
const Home = () => {
  const cards = [
    { id: '01', title: 'Palette Generator', path: '', comp: <PalleteGen /> },
    { id: '02', title: 'Colour converter', path: '', comp: <ColourConv /> },
    {
      id: '03',
      title: 'Contrast Checker',
      path: '',
      comp: <ContrastChecker />,
    },
    {
      id: '04',
      title: 'Colour palette from image',
      path: '',
      comp: <ImgPalette />,
    },
  ];
  return (
    <div className={classes.wrapper}>
      {cards.map((el) => (
        <Card title={el.title} comp={el.comp} key={el.id} />
      ))}
    </div>
  );
};
export default Home;
