import { useEffect, useState } from 'react';
import API from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Products</h2>
      <ul className="list-group">
        {products?.map((p) => (
          <li key={p.id} className="list-group-item">
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
