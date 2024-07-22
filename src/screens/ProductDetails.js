import React from 'react';
import { useParams } from 'react-router-dom';
import tilesdata from '../data';
import "../styles/productdetails.css";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = tilesdata.find((p) => p.id === parseInt(productId, 10));

  const handleClick = () => {
    navigate('/cart');
  };
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='product-page'>
        <div onClick={handleClick}>
         <ShoppingBagIcon />
         </div>

      <div className='alldetails'>
        <img 
          src={process.env.PUBLIC_URL + '/' + product.image}
          alt={product.name}
          style={{ width: '200px', height: '200px', borderRadius: '7px' }}
        /> 
        <div className='details'>
          <h2>{product.name} Details</h2>
          <p>Price: Rs. {product.price}/-</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
        </div>
        <button className="addtocart" onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
