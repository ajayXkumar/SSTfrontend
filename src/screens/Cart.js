import React from 'react';
import "../styles/cart.css";

const Cart = ({ cartItems, onRemove }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='cart'>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className='cart-item'>
              <img 
                src={process.env.PUBLIC_URL + '/' + item.image}
                alt={item.name}
                style={{ width: '50px', height: '50px', borderRadius: '7px' }}
              />
              <div className='item-details'>
                <span>{item.name}</span>
                <span>Rs. {item.price}/-</span>
                <button onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className='total-price'>
        Total Price: Rs. {totalPrice}/-
      </div>
    </div>
  );
};

export default Cart;
