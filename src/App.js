import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../src/screens/Home';
import Admin from './screens/Admin';
import ProductDetails from './screens/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
