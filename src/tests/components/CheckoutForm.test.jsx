import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CheckoutForm from '../../components/CheckoutForm';

describe('CheckoutForm', () => {
  it('shows error when name is empty on submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.click(screen.getByRole('button', { name: 'Place Order' }));

    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error when phone is not 10 digits', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/address/i), '123 Main St');
    await user.type(screen.getByLabelText(/phone/i), '12345');
    await user.click(screen.getByRole('button', { name: 'Place Order' }));

    expect(
      await screen.findByText('Phone must be exactly 10 digits')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error when address is empty on submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/phone/i), '9876543210');
    await user.click(screen.getByRole('button', { name: 'Place Order' }));

    expect(await screen.findByText('Address is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits successfully with valid inputs', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/address/i), '123 Main St');
    await user.type(screen.getByLabelText(/phone/i), '9876543210');
    await user.click(screen.getByRole('button', { name: 'Place Order' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      customerName: 'Jane Doe',
      address: '123 Main St',
      phone: '9876543210',
    });
  });

  it('disables submit button while submitting', () => {
    render(<CheckoutForm onSubmit={vi.fn()} isSubmitting />);

    const button = screen.getByRole('button', { name: /placing order/i });
    expect(button).toBeDisabled();
  });
});
