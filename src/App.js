import './App.css';
import { createContext, useState } from 'react';
import Header from './components/ui/header/Header';
import Home from './components/ui/pages/HomePage/Home';

export const ThemeContext = createContext({});
const App = () => {
  document.title = 'Colore';
  //https://web.dev/prefers-color-scheme/
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
      <div className="App">
        <Header />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
};
export default App;
