import React, { createContext, useState, useEffect } from 'react';
export const Econtext = createContext();

export default function MainContext({ children }) {
  const [WishP, setWishP] = useState(() => {
    const storedWishP = localStorage.getItem('WishP');
    return storedWishP ? JSON.parse(storedWishP) : [];
  });

  const [cartP, setCartP] = useState(() => {
    const storedCartP = localStorage.getItem('cartP');
    return storedCartP ? JSON.parse(storedCartP) : [];
  });

  useEffect(() => {
    localStorage.setItem('WishP', JSON.stringify(WishP));
  }, [WishP]);

  useEffect(() => {
    localStorage.setItem('cartP', JSON.stringify(cartP));
  }, [cartP]);

  const data = { WishP, setWishP, cartP, setCartP };

  return (
    <Econtext.Provider value={data}>
      {children}
    </Econtext.Provider>
  );
}
