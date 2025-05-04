import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { BasketContext } from '../contexts/BasketContext';

function renderNav(user) {
  const basketStub = { items: [], totalQty: 0 };
  const authStub = {
    user,
    isCustomer: user?.role === 'Customer',
    isAdmin: user?.role === 'Admin',
    logout: jest.fn()
  };

  render(
    <MemoryRouter>
      <BasketContext.Provider value={basketStub}>
        <AuthContext.Provider value={authStub}>
          <Navbar />
        </AuthContext.Provider>
      </BasketContext.Provider>
    </MemoryRouter>
  );
}

test('shows Login / Register for guests', () => {
  renderNav(null);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByText(/register/i)).toBeInTheDocument();
});

test('shows Logout for customers', () => {
  renderNav({ role: 'Customer' });
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
});

test('shows Logout for admins', () => {
  renderNav({ role: 'Admin' });
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
});
