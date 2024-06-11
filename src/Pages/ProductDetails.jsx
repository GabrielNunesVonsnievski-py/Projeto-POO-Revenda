import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css'; 

const all_products = [
    {
        id: 0,
        name: "BMW M8", 
        price: 'R$ 100', 
        img: 'https://cdn.autopapo.com.br/box/uploads/2022/06/20170120/bmw-m8_competition_gran_coupe-2023-1024-01-732x488.jpg',
    },
    {
        id: 1,
        name: "CHEVROLET ASTRA", 
        price: 'R$ 50', 
        img: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202406/20240603/chevrolet-astra-2-0-mpfi-8v-flex-4p-manual-wmimagem18051948041.webp?s=fill&w=552&h=414&q=60',
    },
];

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = all_products[id];

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart'); // Redireciona para a página do carrinho
    };

    return (
        <div className="product-details-container">
            <img className="product-image" src={product.img} alt={product.name} />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Adicionar ao Carrinho</button>
            </div>
        </div>
    );
}

export default ProductDetails;
