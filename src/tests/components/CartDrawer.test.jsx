import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CartDrawer from '../../components/CartDrawer';
import { renderWithProviders } from '../test-utils';

const cartItems = [
  {
    menuItemId: 'burger-1',
    name: 'Classic Cheeseburger',
    price: 9.99,
    quantity: 2,
  },
  {
    menuItemId: 'pizza-1',
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 1,
  },
];

function renderDrawer(cart = []) {
  return renderWithProviders(
    <CartDrawer isOpen onClose={() => {}} />,
    { cartItems: cart }
  );
}

describe('CartDrawer', () => {
  it('renders empty state when cart is empty', () => {
    renderDrawer([]);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(
      screen.getByText('Add items from the menu to get started')
    ).toBeInTheDocument();
  });

  it('renders the correct number of cart items', () => {
    renderDrawer(cartItems);

    expect(screen.getByText('Classic Cheeseburger')).toBeInTheDocument();
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(2);
  });

  it('increases quantity when + is clicked', async () => {
    const user = userEvent.setup();
    renderDrawer([cartItems[0]]);

    const row = screen.getByText('Classic Cheeseburger').closest('li');
    expect(within(row).getByText('2')).toBeInTheDocument();

    await user.click(within(row).getByRole('button', { name: 'Increase quantity' }));

    expect(within(row).getByText('3')).toBeInTheDocument();
  });

  it('decreases quantity when - is clicked', async () => {
    const user = userEvent.setup();
    renderDrawer([cartItems[0]]);

    const row = screen.getByText('Classic Cheeseburger').closest('li');
    await user.click(within(row).getByRole('button', { name: 'Decrease quantity' }));

    expect(within(row).getByText('1')).toBeInTheDocument();
  });

  it('removes item when Remove is clicked', async () => {
    const user = userEvent.setup();
    renderDrawer(cartItems);

    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    await user.click(removeButtons[0]);

    expect(screen.queryByText('Classic Cheeseburger')).not.toBeInTheDocument();
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
  });

  it('calculates total amount correctly', () => {
    renderDrawer(cartItems);

    // 9.99 * 2 + 12.99 * 1 = 32.97
    expect(screen.getByText('$32.97')).toBeInTheDocument();
  });
});
