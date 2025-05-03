import { useEffect, useState } from 'react';
import API from '../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Orders</h2>
      <ul className="list-group">
        {orders?.map((o) => (
          <li key={o.id} className="list-group-item">
            Order #{o.id} - Customer ID: {o.customerId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;