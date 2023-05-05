import './App.css';
import { createContext, useState } from 'react';
import Header from './components/ui/header/Header';
import Home from './components/pages/HomePage/Home';
import Contrast from './components/pages/Contrast/Contrast';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PalleteGen from './components/pages/HomePage/imgComponents/PaletteGen';
import ColourConv from './components/pages/HomePage/imgComponents/ColourConv';
import ContrastChecker from './components/pages/HomePage/imgComponents/ContrastCheck';
import ImgPalette from './components/pages/HomePage/imgComponents/ImgPalette';

export const ThemeContext = createContext({});
const App = () => {
  const menuList = [
    {
      id: '01',
      path: '/paletteGen',
      title: 'Palette Generator',
      comp: <PalleteGen />,
    },
    {
      id: '02',
      path: '/colourConv',
      title: 'Colour converter',
      comp: <ColourConv />,
    },
    {
      id: '03',
      path: '/ContrastCheck',
      title: 'Contrast Checker',
      comp: <ContrastChecker />,
    },
    {
      id: '04',
      path: '/ImagePalette',
      title: 'Colour palette from image',
      comp: <ImgPalette />,
    },
  ];
  document.title = 'Colore';
  const colourMode = () => {
    const isTheme = localStorage.getItem('theme');
    const darkModeOn = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (isTheme) return isTheme;
    if (darkModeOn) return 'dark';
    return 'light';
  };
  const [theme, setTheme] = useState(colourMode);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className="App">
          <Header list={menuList} />
          <main>
            <Routes>
              <Route path="/" element={<Home cards={menuList} />} />
              <Route path="/paletteGen" element={<Contrast />} />
              <Route path="/colourConv" element={<Contrast />} />
              <Route
                path="/ContrastCheck"
                element={<Contrast title="Contrast Checker" />}
              />
              <Route path="/ImagePalette" element={<Contrast />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};
export default App;
