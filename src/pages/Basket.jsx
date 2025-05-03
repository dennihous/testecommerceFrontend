import React, { useState } from 'react';
import dummyData from '../data/dummyData.json';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  const addItem = (item) => {
    setBasketItems((prevItems) => {
      // Check if the item is already in the basket.
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Increase the quantity if it exists.
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Otherwise, add the new item with a quantity of 1.
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setBasketItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const totalCost = () => {
    return basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Basket</h2>
      {basketItems.length === 0 ? (
        <p className="text-center">Your basket is empty.</p>
      ) : (
        <div className="mb-4">
          {basketItems.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-center mb-3"
            >
              <div>
                <strong>{item.name}</strong> — Quantity: {item.quantity}
              </div>
              <button
                className="btn btn-danger ms-3"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h4 className="text-center">
            Total: ${totalCost().toFixed(2)}
          </h4>
        </div>
      )}
      <h3 className="text-center">Available Products</h3>
      <div className="row justify-content-center">
        {dummyData.products.map((product) => (
          <div
            key={product.id}
            className="col-md-4 mb-3 d-flex justify-content-center"
          >
            <div className="card" style={{ width: '18rem' }}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{product.name}</h5>
                <p className="card-text text-center">${product.price}</p>
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={() => addItem(product)}
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
