import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';

const CheckoutPage = () => {
  const { cart, removeFromCart, getTotal, clearCart } = useCart();

  return (
    <div className='checkout'>
      <Link to="/" className='back-link2'>← Back to Cafeterias</Link>
      <h1 className='checkout-title'>Your Order:</h1>

      {cart.length === 0 ? (
        <div className='checkout-empty'>
          <div className='checkout-empty-icon'>🛒</div>
          <p className='checkout-empty-text'>Your cart is empty. Browse our cafeterias and add some meals!</p>
          <Link to="/" className='btn btn--primary btn--lg'>Browse Cafeterias</Link>
        </div>
      ) : (
        <div className="checkout-summary">
          <div className='checkout-items'>
            {cart.map((item) => (
              <div key={item.id} className='checkout-item'>
                <div className='checkout-item-details'>
                  <h4>{item.name}</h4>
                  <span className='checkout-item-price'>KES {item.price}</span>
                </div>
                <button className='btn btn--danger'
                  onClick={() => { removeFromCart(item.id); alert((`${item.name} is being removed from cart`)) }}
                > Remove
                </button>
              </div>
            ))}
          </div>
          <div className='checkout-total'>
            <h3>Total: KES {getTotal()}</h3>
          </div>

          <div className='checkout-actions'>
            <button className='btn btn--secondary' onClick={clearCart}>Clear Cart</button>
            <button className='btn btn--primary btn--lg' onClick={() => {
              alert("Order Placed successfully!!");
              clearCart();
            }}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
