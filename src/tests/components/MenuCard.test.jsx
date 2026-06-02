import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import MenuCard from '../../components/MenuCard';

const mockItem = {
  id: 'pizza-1',
  name: 'Margherita Pizza',
  description: 'Fresh mozzarella, basil, and tomato sauce',
  price: 12.99,
  imageUrl: 'https://example.com/margherita.jpg',
  category: 'Pizza',
};

describe('MenuCard', () => {
  it('renders item name, price, and description correctly', () => {
    render(<MenuCard item={mockItem} onAdd={vi.fn()} />);

    expect(screen.getByRole('heading', { name: mockItem.name })).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('renders the Add to Cart button', () => {
    render(<MenuCard item={mockItem} onAdd={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Add to Cart' })
    ).toBeInTheDocument();
  });

  it('calls onAdd with the menu item when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MenuCard item={mockItem} onAdd={onAdd} />);

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(mockItem);
  });

  it('formats price with two decimal places', () => {
    const item = { ...mockItem, price: 9.5 };
    render(<MenuCard item={item} onAdd={vi.fn()} />);

    expect(screen.getByText('$9.50')).toBeInTheDocument();
  });
});
