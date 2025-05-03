import { useEffect, useState } from 'react';
import API from '../services/api';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await API.get('/customers');
        setCustomers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Customers</h2>
      <ul className="list-group">
        {customers?.map((c) => (
          <li key={c.id} className="list-group-item">
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;