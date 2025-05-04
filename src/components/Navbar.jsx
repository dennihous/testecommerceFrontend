import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { BasketContext } from '../contexts/BasketContext';

export default function Navbar() {
  const { user, isAdmin, isCustomer, logout } = useContext(AuthContext);
  const { items, totalQty } = useContext(BasketContext);

// uses sticky top so that if you scroll down the navbar will remain there
// uses inline styling and bootstrap for styling
// has conditional navbar view depending on who is logged in
// utilises navlink to navigate through the web page
  return (
    <nav
      className="navbar navbar-expand navbar-dark bg-primary sticky-top"
      style={{ height: '60px' }}
    >
      <div className="container-fluid px-3">

        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
          style={{ height: '60px' }}
        >
          <i className="bi bi-shop fs-4 me-2" />
          <span className="d-none d-sm-inline">Dennis' Shop</span>
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">

            {(items.length > 0 || user) && (
              <li className="nav-item mx-1 mx-lg-2">
                <NavLink className="nav-link position-relative p-2" to="/basket">
                  <i className="bi bi-cart3 fs-5" />
                  {totalQty > 0 && (
                    <span
                      className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65rem', padding: '3px 5px' }}
                    >
                      {totalQty}
                    </span>
                  )}
                </NavLink>
              </li>
            )}

            {isCustomer && (
              <li className="nav-item mx-1 mx-lg-2">
                <NavLink className="nav-link p-2" to="/customer">
                  <i className="bi bi-person-circle me-lg-1" />
                  <span className="d-none d-lg-inline">Account</span>
                </NavLink>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item mx-1 mx-lg-2">
                <NavLink className="nav-link p-2" to="/admin">
                  <i className="bi bi-speedometer2 me-lg-1" />
                  <span className="d-none d-lg-inline">Admin</span>
                </NavLink>
              </li>
            )}

            {user ? (
              <li className="nav-item mx-1 mx-lg-2">
                <button className="btn btn-outline-light py-1 px-2" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item mx-1 mx-lg-2">
                  <NavLink className="nav-link p-2" to="/login">
                    <i className="bi bi-box-arrow-in-right me-lg-1" />
                    <span className="d-none d-lg-inline">Login</span>
                  </NavLink>
                </li>
                <li className="nav-item mx-1 mx-lg-2">
                  <NavLink className="btn btn-outline-light py-1 px-2" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

