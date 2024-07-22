import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../src/screens/Home';
import ProductDetails from './screens/ProductDetails';
import CartPage from './screens/Cartpage';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage cartItems={cartItems} onRemove={handleRemoveFromCart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
