import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import HomePage from './pages/HomePage.js';
import CafeteriaMenuPage from './pages/CafeteriaMenuPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cafeteria/:id" element={<CafeteriaMenuPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
