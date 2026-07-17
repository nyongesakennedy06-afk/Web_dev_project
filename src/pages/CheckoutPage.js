import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className='checkout'>
      <Link to = "/" className='back-link2'>--Continue Shopping </Link>
      <h1 className='checkout-title'>Your Order:</h1>

      {cart.length === 0 ? (
        <div className='checkout-empty'>
          <div className='checkout-empty-icon'>🛒</div>
          <p className='checkout-empty-text'>Your cart is empty. Browse our cafeterias and add some meals!</p>
          <Link to = "/" className='btn btn--primary btn--lg'>Browse Cafeterias</Link>
        </div>
      ) : (
        <div className="checkout__summary">
          {/* Real cart items will go here in Step 8 */}
        </div>
      )}
      
    </div>
  );
};

export default CheckoutPage;
