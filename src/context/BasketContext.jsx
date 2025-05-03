import { createContext, useState } from 'react';

export const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.product.id === product.id);
      if (found) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
  };

  const removeItem = productId => setItems(prev => prev.filter(i => i.product.id !== productId));
  const clear = () => setItems([]);

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </BasketContext.Provider>
  );
}
