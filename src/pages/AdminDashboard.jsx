import React, { useState, useEffect } from 'react';
import dummyData from '../data/dummyData.json';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(dummyData.products);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <h4>Existing Products</h4>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="list-group">
          {products.map(product => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              {product.name} - ${product.price}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => alert(`Delete product ${product.id}`)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
