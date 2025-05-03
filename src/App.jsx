import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CustomerPage from './pages/CustomerPage';
import AdminDashboard from './pages/AdminDashboard';
import BasketPage from './pages/BasketPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container my-4 flex-grow-1" >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route 
            path="/customer" element={
              <PrivateRoute allow={['Customer']}>
                <CustomerPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" element={
              <PrivateRoute allow={['Admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/basket" element={
              <PrivateRoute allow={['Customer', 'Admin']}>
                <BasketPage />
              </PrivateRoute>
              } 
            />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
