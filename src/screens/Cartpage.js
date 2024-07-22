import React from 'react';
import Cart from './Cart';

const CartPage = ({ cartItems, onRemove }) => {
  // Function to create WhatsApp message link
  const generateWhatsAppLink = (cartItems) => {
    let message = 'Order details:\n';
    cartItems.forEach(item => {
      message += `${item.name} (Quantity: ${item.quantity})\n`;
    });

    const phoneNumber = '7232849475'; // Replace with the owner's phone number
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Handler for the "Send to WhatsApp" button
  const handleSendToWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(cartItems);
    window.location.href = whatsappLink;
  };

  return (
    <div className='cart-page'>
      <h2>Your Cart</h2>
      <Cart cartItems={cartItems} onRemove={onRemove} />
      <button onClick={handleSendToWhatsApp}>Send to WhatsApp</button>
    </div>
  );
};

export default CartPage;
