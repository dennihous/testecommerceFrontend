import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function CustomerPage() {
  const { user, login } = useContext(AuthContext);

  const [customer, setCustomer] = useState(null);
  const [editName, setEditName]  = useState('');
 const [editEmail, setEditEmail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    api.get('/customers/me')
       .then(r => {
          setCustomer(r.data);
          setEditName(r.data.name);
         setEditEmail(r.data.email);
       })
       .catch(() => setError('No customer profile found.'));
  }, [user]);

  const save = async () => {
    try {
      setSaving(true);

     const { data } = await api.put('/customers/me', {
       name:  editName,
       email: editEmail
     });

     const cust = data.customer ?? data;
     const token = data.token;

      setCustomer(cust);
      setEditName(cust.name);
      setEditEmail(cust.email);

      setSuccess('Profile updated successfully');
      setError('');

     if (token) {
       localStorage.setItem('token', token);
       window.dispatchEvent(new Event('storage'));
     }

    } catch {
      setError('Unable to save profile');
      setSuccess('')
      alert('Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!customer) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: 500 }}>
      {success && <div className='alert alert-success py-2'>{success}</div>}
      {error && <div className='alert alert-danger py-2'>{error}</div>}

      <h2>{customer.name}'s profile</h2>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control"
               value={editName}
               onChange={e => setEditName(e.target.value)} />
      </div>

      <div className="mb-3">
       <label className="form-label">Email</label>
       <input className="form-control"
              type="email"
              value={editEmail}
              onChange={e => setEditEmail(e.target.value)} />
      </div>


      <button className="btn btn-primary" onClick={save} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  );
}