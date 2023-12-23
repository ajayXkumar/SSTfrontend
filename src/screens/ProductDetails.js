// ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import tilesdata from '../data';

const ProductDetails = () => {
  const { productId } = useParams();
  console.log('ProductId:', productId);

  const product = tilesdata.find((p) => p.id === parseInt(productId, 10));
  console.log('Product:', product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div><img
    src={product.image}
    alt={product.name}
    style={{ width: '200px', height: '200px', borderRadius: '7px' }}
  />
      <h2>{product.name} Details</h2>
      <p>Description: {product.description}</p>
      <p>Price: Rs. {product.price}/-</p>
      <p>Category: {product.catagory}</p>
      <p>Quantity: {product.quantity}</p>
      
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetails;
