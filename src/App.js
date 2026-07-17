import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import HomePage from './pages/HomePage.js';
import CafeteriaMenuPage from './pages/CafeteriaMenuPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import './App.css';

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"}>
      <Routes>
        <Route element={<Layout />}>
         <Route index element={<HomePage />} />
         <Route path="cafeteria/:id" element={<CafeteriaMenuPage />} />
         <Route path="checkout" element={<CheckoutPage />} />
       </Route>
    
      </Routes>
    </div>
  );
};

export default App;
