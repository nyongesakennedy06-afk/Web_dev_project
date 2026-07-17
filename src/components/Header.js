import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
   const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <div className="header_inner">
        <Link to = "/" className="header_logo">StrathsBites</Link>
        <nav className="header_nav">
          <Link to = "/" className='header_link'>Home</Link>
          <Link to = "/checkout" className="header_cartbtn">🛒 Cart</Link>
           <button
            onClick={toggleTheme}
            className="theme_btn">
          
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
