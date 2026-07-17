import { useCart } from '../context/CartContext.js';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="menu-item">
      <div className="menu-item-image" />
      <div className="menu-item-details">
        <h4 className="menu-item-name">{item.name}</h4>
        <p className="menu-item-desc">{item.description}</p>
        <span className="menu-item-price">KES {item.price}</span>
      </div>
      <div>
        <button
          className="btn btn--primary"
          onClick={() => { addToCart(item); alert((`${item.name} has been added to cart`)) }}>+ Add
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
