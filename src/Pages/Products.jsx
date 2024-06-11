import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; 

const Products = () => {
    const all_products = [
        {
            name: "BMW M8", 
            price: 'R$ 100', 
            img: 'https://cdn.autopapo.com.br/box/uploads/2022/06/20170120/bmw-m8_competition_gran_coupe-2023-1024-01-732x488.jpg',
        },
        {
            name: "CHEVROLET ASTRA", 
            price: 'R$ 50', 
            img: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202406/20240603/chevrolet-astra-2-0-mpfi-8v-flex-4p-manual-wmimagem18051948041.webp?s=fill&w=552&h=414&q=60',
        },
    ];

    return (
        <div className="products-container">
            {all_products.map((product, index) => (
                <div className="product" key={index}>
                    <Link to={`/product/${index}`} className="product-link"> 
                        <img src={product.img} alt={product.name} className="product-img" />
                        <div className="product-info">
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
  
export default Products;
