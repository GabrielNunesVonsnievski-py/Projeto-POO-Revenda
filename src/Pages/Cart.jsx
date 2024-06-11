import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, setCartItems }) => {
    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
    };

    const removeItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    return (
        <div className="cart-container">
            <h2><center>Carrinho</center></h2>
            <ul className="cart-items">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <span className="item-info">{item.name} - {item.price}</span>
                        <span className="quantity">Quantidade: {item.quantity}</span>
                        <button className="increase-btn" onClick={() => increaseQuantity(index)}>+</button>
                        <button className="remove-btn" onClick={() => removeItem(index)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
