import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header_inner">
        <Link to = "/" className="header_logo">StrathsBites</Link>
        <nav className="header_nav">
          <Link to = "/" className='header_link'>Home</Link>
          <Link to = "/checkout" className="header_cartbtn">🛒 Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
