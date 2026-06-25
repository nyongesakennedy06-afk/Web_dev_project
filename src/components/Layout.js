import { Outlet } from 'react-router-dom';
import Header from './Header.js';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        {/* TODO: Add your footer content */}
      </footer>
    </div>
  );
};

export default Layout;
