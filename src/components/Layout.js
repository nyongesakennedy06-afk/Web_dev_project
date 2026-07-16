import { Outlet } from 'react-router-dom';
import Header from './Header.js';

const Layout = () => {
  return (
    <div className='page-wrapper'>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
      <footer>
        <p className='footer'>© StrattsBites by SU: Est in 2026</p>  
      </footer>
    </div>
  );
};

export default Layout;
