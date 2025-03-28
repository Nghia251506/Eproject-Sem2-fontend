// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    products: [],
  });

  const addProduct = (product) => {
    setCartState((prevState) => ({
      products: [...prevState.products, product],
    }));
    console.log('products: ' + JSON.stringify(cartState))
  };

  return (
    <CartContext.Provider value={{ cartState, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
