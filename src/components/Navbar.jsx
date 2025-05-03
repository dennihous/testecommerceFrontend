import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">ECommerce</Link>
        <div>
          {token ? (
            <>
              <Link className="btn btn-outline-primary mx-1" to="/products">Products</Link>
              <Link className="btn btn-outline-primary mx-1" to="/customers">Customers</Link>
              <Link className="btn btn-outline-primary mx-1" to="/orders">Orders</Link>
              <Link className="btn btn-outline-primary mx-1" to="/reviews">Reviews</Link>
              <button className="btn btn-danger mx-1" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
