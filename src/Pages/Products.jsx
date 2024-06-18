import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css'; 

const Products = () => {
    const [allProducts, setAllProducts] = useState([
        {
            codigo: '1',
            name: "BMW M8", 
            price: 'R$ 100', 
            img: 'https://cdn.autopapo.com.br/box/uploads/2022/06/20170120/bmw-m8_competition_gran_coupe-2023-1024-01-732x488.jpg',
        },
        {
            codigo: '2',
            name: "CHEVROLET ASTRA", 
            price: 'R$ 50', 
            img: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202406/20240603/chevrolet-astra-2-0-mpfi-8v-flex-4p-manual-wmimagem18051948041.webp?s=fill&w=552&h=414&q=60',
        },
    ]);

    const [newProduct, setNewProduct] = useState({
        codigo: '',
        descricao: '',
        codcategoria: '',
        codmodelo: '',
        ano: '',
        cor: '',
        placa: '',
        opcional: '',
        valor: '',
        foto1: ''
    });

    const [message, setMessage] = useState('');
    const [showAll, setShowAll] = useState(false); // Estado para controlar a visibilidade dos produtos

    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/veiculo', {
            codigo: newProduct.codigo,
            descricao: newProduct.descricao,
            codcategoria: newProduct.codcategoria,
            codmodelo: newProduct.codmodelo,
            ano: newProduct.ano,
            cor: newProduct.cor,
            placa: newProduct.placa,
            opcional: newProduct.opcional,
            valor: newProduct.valor,
            foto1: newProduct.foto1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setMessage('Produto adicionado com sucesso!');
            setAllProducts([...allProducts, newProduct]);
            setNewProduct({
                codigo: '',
                descricao: '',
                codcategoria: '',
                codmodelo: '',
                ano: '',
                cor: '',
                placa: '',
                opcional: '',
                valor: '',
                foto1: ''
            });
        }).catch(error => {
            setMessage('Erro ao adicionar produto.');
        });
    };

    const handleDeleteProduct = (codigo) => {
        axios.delete(`http://localhost:3000/veiculo/${codigo}`)
            .then(response => {
                setMessage('Produto excluído com sucesso!');
                setAllProducts(allProducts.filter(product => product.codigo !== codigo));
            }).catch(error => {
                setMessage('Erro ao excluir produto.');
            });
    };

    const handleShowAllProducts = () => {
        axios.get('http://localhost:3000/veiculo')
            .then(response => {
                setAllProducts(response.data);
                setShowAll(true);
            }).catch(error => {
                setMessage('Erro ao carregar produtos.');
            });
    };

    return (
        <div className="products-container">
            <button className="add-button" onClick={() => document.getElementById('addProductForm').style.display = 'block'}>
                ADICIONAR
            </button>
            <br></br>
            <form id="addProductForm" className="add-product-form" onSubmit={handleAddProduct} style={{display: 'none'}}>
                <h2>Adicionar Produto</h2>
                <input
                    type="text"
                    placeholder="Código"
                    value={newProduct.codigo}
                    onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newProduct.descricao}
                    onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Código Categoria"
                    value={newProduct.codcategoria}
                    onChange={(e) => setNewProduct({ ...newProduct, codcategoria: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Código Modelo"
                    value={newProduct.codmodelo}
                    onChange={(e) => setNewProduct({ ...newProduct, codmodelo: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Ano"
                    value={newProduct.ano}
                    onChange={(e) => setNewProduct({ ...newProduct, ano: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={newProduct.cor}
                    onChange={(e) => setNewProduct({ ...newProduct, cor: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Placa"
                    value={newProduct.placa}
                    onChange={(e) => setNewProduct({ ...newProduct, placa: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Opcional"
                    value={newProduct.opcional}
                    onChange={(e) => setNewProduct({ ...newProduct, opcional: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Valor"
                    value={newProduct.valor}
                    onChange={(e) => setNewProduct({ ...newProduct, valor: e.target.value })}
                    required
                />
                <input
                    type="file"
                    placeholder="Foto"
                    value={newProduct.foto1}
                    onChange={(e) => setNewProduct({ ...newProduct, foto1: e.target.value })}
                    required
                />
                <button type="submit">Adicionar Produto</button>
                <br></br>
            </form>
            {message && <p className="message">{message}</p>}
            <div className="products-list">
                {allProducts.map((product, index) => (
                    <div className="product" key={index}>
                        <Link to={`/product/${index}`} className="product-link"> 
                            <img src={product.img} alt={product.name} className="product-img" />
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </Link>
                        <button className="delete-button" onClick={() => handleDeleteProduct(product.codigo)}>Excluir</button>
                    </div>
                ))}
            </div>
            {!showAll && (
                <div className="see-more-container">
                    <button className="see-more-button" onClick={handleShowAllProducts}>
                        Ver mais <span className="arrow">V</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;
