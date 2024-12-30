import React, { useState } from 'react';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import './../styles/cartpage.css'
const CartPage = ({ cartItems, onRemove }) => {
  const [userName, setUserName] = useState('');
  const [userVillage, setUserVillage] = useState('');

  // Function to create WhatsApp message link
  const generateWhatsAppLink = (cartItems, userName, userVillage) => {
    let message = `Order details:\n\nUser: ${userName}\nVillage: ${userVillage}\n\nItems:\n`;
    cartItems.forEach(item => {
      message += `${item.name} (Quantity: ${item.quantity})\n`;
    });

    const phoneNumber = '7232849475';
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Handler for the "Send to WhatsApp" button
  const handleSendToWhatsApp = () => {
    if (!userName || !userVillage) {
      alert('Please provide your name and village.');
      return;
    }
    const whatsappLink = generateWhatsAppLink(cartItems, userName, userVillage);
    window.location.href = whatsappLink;
  };

  return (
    <div className='cart-page'>
     
       <div className='top-bar'>
 
          <p >
         <Link style={{textDecoration : "none" ,color:"black",fontWeight:"bold"}} to="/">Home</Link>
        </p>
        </div>
        <div className='cart-content'>
      <Cart cartItems={cartItems} onRemove={onRemove} />
      <div className='user-details-form'>
        <label>
          Name:
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Enter your name'
          />
        </label>
        <label>
          Village:
          <input
            type='text'
            value={userVillage}
            onChange={(e) => setUserVillage(e.target.value)}
            placeholder='Enter your village'
          />
        </label>
      </div>
      <button style={{backgroundColor:"green"}}onClick={handleSendToWhatsApp}>Send to WhatsApp</button>
      </div>
    </div>
  );
};

export default CartPage;
