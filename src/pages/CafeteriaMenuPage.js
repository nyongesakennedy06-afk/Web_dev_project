import { useParams, Link } from 'react-router-dom';
import data from '../data/data.json';
import MenuItem from '../components/MenuItem.js';

const CafeteriaMenuPage = () => {
  const { id } = useParams();
  const cafeteria = data.cafeterias.find((c) => c.id === id);

  if (!cafeteria) {
    return (
      <div>
        <h2 className='error-text'>Cafeteria not Found</h2>
        <Link to="/" className='back-link'>Back to Home</Link>
      </div>
    );
  }
  return (
    <div>
      <Link to="/" className='back-link'>Back to all Cafeterias</Link>
      <div className='menu-header'>
        <h1 className='menu-header-title'>{cafeteria.name}</h1>
        <div className='menu-header-info'>
          <span>⭐ {cafeteria.rating}</span>
          <span>🕐 {cafeteria.deliveryTime}</span>
        </div>
        <p className='menu-header-desc'>{cafeteria.description}</p>
      </div>

      <div className='menu-list'>
        {cafeteria.menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CafeteriaMenuPage;
