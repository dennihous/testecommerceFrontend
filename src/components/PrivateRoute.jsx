import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children, allow = [] }) {
  const { user } = useContext(AuthContext);

  // if users logs in then they have certain permissions, if no they are promped to go to login page

  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
