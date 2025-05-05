import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { BasketContext } from '../contexts/BasketContext';
import { AuthContext }   from '../contexts/AuthContext';

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { addItem } = useContext(BasketContext);
  const { user, isCustomer } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [custId, setCustId] = useState(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data));
    api.get(`/reviews/product/${id}`).then(r => setReviews(r.data));
  }, [id]);

  useEffect(() => {
    if (!isCustomer) {
      setCustId(null);
      return;
    }
    api.get('/customers/me')
       .then(r => setCustId(r.data.id))
       .catch(() => setCustId(null));
  }, [isCustomer]);

  async function submitReview(e) {
    e.preventDefault();
    if (!custId) {
      setFormErr('Unable to find your customer profile.');
      return;
    }
    if (!content.trim()) {
      setFormErr('Review cannot be empty.');
      return;
    }

    try {
      setSaving(true);
      const { data } = await api.post('/reviews', {
        customerId: custId,
        productId: Number(id),
        rating: Number(rating),
        content: content.trim()
      });

      setReviews(prev => [...prev, data]);
      setContent('');
      setRating(5);
      setFormErr('');
    } catch {
      setFormErr('Could not submit review. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!product) return <p>Loading…</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="btn btn-primary" onClick={() => addItem(product)}>
        Add to Basket
      </button>

      <hr />

      <h2 className="mb-3">Reviews</h2>

      {reviews.map(r => (
        <div key={r.id} className="mb-3">
          <strong>{r.customer?.name ?? 'Anon'}</strong> ({r.rating}/5)
          <p className="mb-1">{r.content}</p>
        </div>
      ))}

      {isCustomer ? (
        <form onSubmit={submitReview} className="border p-3 rounded">
          <h5>Add a review</h5>

          {formErr && <div className="alert alert-danger py-1">{formErr}</div>}

          <div className="mb-2">
            <label className="form-label me-2">Rating:</label>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              className="form-select d-inline-block"
              style={{ width: 'auto' }}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Write your review here…"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          <button className="btn btn-success" disabled={saving}>
            {saving ? 'Saving…' : 'Submit review'}
          </button>
        </form>
      ) : (
        <p className="text-muted">Log in as a customer to leave a review.</p>
      )}
    </div>
  );
}