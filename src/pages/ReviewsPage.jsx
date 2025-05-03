import { useEffect, useState } from 'react';
import API from '../services/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get('/reviews/product/1');
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Reviews</h2>
      <ul className="list-group">
        {reviews?.map((r) => (
          <li key={r.id} className="list-group-item">
            {r.content} - Rating: {r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;