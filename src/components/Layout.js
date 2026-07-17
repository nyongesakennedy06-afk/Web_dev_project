import { Outlet } from 'react-router-dom';
import Header from './Header.js';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Layout = () => {
   const { darkMode } = useContext(ThemeContext);
  return (
    <div className={darkMode ? "page-wrapper dark-mode" : "page-wrapper"}>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
      <footer>
        <p className='footer'>© StrathsBites by SU: Est in 2026</p>
      </footer>
    </div>
  );
};

export default Layout;
