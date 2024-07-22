import React from 'react';
import Cart from './Cart';

const CartPage = ({ cartItems, onRemove }) => {
  return (
    <div className='cart-page'>
      <h2>Your Cart</h2>
      <Cart cartItems={cartItems} onRemove={onRemove} />
    </div>
  );
};

export default CartPage;
