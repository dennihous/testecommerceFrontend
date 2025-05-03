import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { BasketContext } from '../contexts/BasketContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { addItem } = useContext(BasketContext);

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data));
    api.get(`/reviews/product/${id}`).then(r => setReviews(r.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="btn btn-primary" onClick={() => addItem(product)}>Add to Basket</button>
      <hr />
      <h2>Reviews</h2>
      {reviews.map(r => (
        <div key={r.id} className="mb-3">
          <strong>{r.customer.name}</strong> ({r.rating}/5)
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
}