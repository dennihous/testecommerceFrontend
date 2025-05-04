import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import api from '../services/api';
import { BasketContext } from '../contexts/BasketContext';

api.get.mockResolvedValueOnce({ data: [] });

test('renders without crashing when request completes', () => {
   render(
     <BasketContext.Provider value={{ addItem: jest.fn() }}>
       <HomePage />
     </BasketContext.Provider>
   );
 });