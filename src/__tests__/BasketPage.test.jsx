import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BasketPage from '../pages/BasketPage';
import { BasketContext } from '../contexts/BasketContext';
import api from '../services/api';

const tea = { id: 1, name: 'Tea', price: 2, stock: 5 };

function renderBasket(items) {
  const ctx = {
    items,
    increment: jest.fn(),
    decrement: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };

  render(
    <MemoryRouter>
      <BasketContext.Provider value={ctx}>
        <BasketPage />
      </BasketContext.Provider>
    </MemoryRouter>
  );

  return ctx;
}

test('renders product name + qty', () => {
  renderBasket([{ product: tea, qty: 2 }]);
  expect(screen.getByText('Tea')).toBeInTheDocument();
  expect(screen.getByText(/2/)).toBeInTheDocument();
});

test('+ button increments', () => {
  const ctx = renderBasket([{ product: tea, qty: 1 }]);
  fireEvent.click(screen.getByRole('button', { name: '＋' }));
  expect(ctx.increment).toHaveBeenCalledWith(tea.id);
});


test('checkout clears basket', async () => {
    api.post.mockResolvedValueOnce({});
    const ctx = renderBasket([{ product: tea, qty: 1 }]);
  
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));
    await waitFor(() => expect(ctx.clear).toHaveBeenCalled());
  
    expect(ctx.clear).toHaveBeenCalled();
  });
