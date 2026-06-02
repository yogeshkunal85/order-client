import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export function renderWithProviders(ui, { route = '/', cartItems } = {}) {
  if (cartItems !== undefined) {
    if (cartItems.length === 0) {
      localStorage.removeItem('fooddash_cart');
    } else {
      localStorage.setItem('fooddash_cart', JSON.stringify(cartItems));
    }
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
}
