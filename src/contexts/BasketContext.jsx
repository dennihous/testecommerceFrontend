import { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const BasketContext = createContext();

export function BasketProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    const stored = localStorage.getItem(`basket_${user.email}`);
    setItems(stored ? JSON.parse(stored) : []);
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`basket_${user.email}`, JSON.stringify(items));
    }
  }, [items, user]);

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const addItem = (product, qty = 1) =>
    setItems(prev => {
      const found   = prev.find(i => i.product.id === product.id);
      const current = found?.qty ?? 0;
      const newQty  = Math.min(current + qty, product.stock);

      if (found)
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: newQty } : i
        );

      return [...prev, { product, qty: Math.min(qty, product.stock) }];
    });

  const removeItem = id =>
    setItems(prev => prev.filter(i => i.product.id !== id));

  const increment = id =>
    setItems(prev =>
      prev.map(i =>
        i.product.id === id
          ? { ...i, qty: Math.min(i.qty + 1, i.product.stock) }
          : i
      )
    );

  const decrement = id =>
    setItems(prev =>
      prev.flatMap(i => {
        if (i.product.id !== id) return i;
        if (i.qty === 1)         return [];
        return { ...i, qty: i.qty - 1 };
      })
    );

  const clear = () => setItems([]);

  return (
    <BasketContext.Provider
      value={{
        items,
        totalQty,
        addItem,
        increment,
        decrement,
        removeItem,
        clear
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}