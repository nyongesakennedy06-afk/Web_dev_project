import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './index.css';
import { CartProvider } from './context/CartContext.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <CartProvider>
       <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
