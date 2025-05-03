import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/login');
    } catch(msg) {
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: 400}}>
      <h2>Register</h2>  
      {error && (
        <div className='alert alert-danger py-1' role="alert">
          {error}
        </div>
      )}   
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary">Register</button>
    </form>
  );
}