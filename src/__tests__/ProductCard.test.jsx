import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const product = { id: 1, name: 'Coffee', price: 4.5 };

test('renders name + price and calls onAdd', () => {
  const onAdd = jest.fn();

  render(
    <MemoryRouter>
      <ProductCard product={product} onAdd={onAdd} />
    </MemoryRouter>
  );

  expect(screen.getByText('Coffee')).toBeInTheDocument();
  expect(screen.getByText('£4.5')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /add to basket/i }));
  expect(onAdd).toHaveBeenCalledWith(product);
});
