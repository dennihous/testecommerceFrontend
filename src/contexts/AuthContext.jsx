import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const ID_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

// when decoding the token, it returns the keys of the URLs above

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const decodeToken = token => {
    try {
      const payload = jwtDecode(token);
      return {
        token,
        id: payload[ID_CLAIM],
        email: payload[EMAIL_CLAIM] ?? payload.email,
        role: payload[ROLE_CLAIM] ?? payload.role
      };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('token');
    const decoded = stored && decodeToken(stored);
    if (decoded) setUser(decoded);
    else localStorage.removeItem('token');
  }, []);

  const login = async (email, password) => {
      try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(decodeToken(data.token));
      return true;
    } catch (err) {
      throw err.response?.data ?? 'Login failed';
    }
  };

  const register = async (email, password) => {
    try {
      await api.post('/auth/register', { email, password });
      return true;
    } catch (err) {
      throw err.response?.data ?? 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user?.role === 'Admin';
  const isCustomer = user?.role === 'Customer';

  return (
    <AuthContext.Provider value={{ user, isAdmin, isCustomer, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}