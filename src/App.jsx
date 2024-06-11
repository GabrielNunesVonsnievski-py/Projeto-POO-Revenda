import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";

const App = () => {
  let heroData = [
    { text1: "Dirija", text2: "Oque você ama" },
    { text1: "Saciar", text2: "suas paixões" },
    { text1: "Ceder a", text2: "suas paixões" },
  ];
  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(item => item.name === product.name);
      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        return updatedCartItems;
      }
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Navbar cartItemsCount={cartItems.length}/>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Background playStatus={playStatus} heroCount={heroCount} />
              <Hero
                setPlayStatus={setPlayStatus}
                heroData={heroData[heroCount]}
                heroCount={heroCount}
                setHeroCount={setHeroCount}
                playStatus={playStatus}
              />
            </div>
          }
        />
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
