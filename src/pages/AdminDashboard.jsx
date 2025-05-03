import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => { api.get('/products').then(r => setProducts(r.data)); }, []);

  // Add handlers for create/update/delete
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Form to create/update products and list with edit/delete buttons */}
    </div>
  );
}