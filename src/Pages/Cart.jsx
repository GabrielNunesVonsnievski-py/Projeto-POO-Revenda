import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, setCartItems }) => {
   //adiciona qntd de item no carrinho 
    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
    };
    //remove o item do carrinho e os krl
    const removeItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    // calcula o total dos itens no carrinho e é isso
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity;
        });
        return total.toFixed(2);
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
            {/* Mostra o total dos itens */}
            <div className="total">
                Total: R$ {calculateTotal()}
            </div>
        </div>
    );
}

export default Cart;
