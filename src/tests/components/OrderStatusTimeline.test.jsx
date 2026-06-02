import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OrderStatusTimeline from '../../components/OrderStatusTimeline';
import { ORDER_STATUSES } from '../../utils/orderStatus';

describe('OrderStatusTimeline', () => {
  it('renders all 4 steps', () => {
    render(<OrderStatusTimeline currentStatus="Preparing" />);

    ORDER_STATUSES.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  it('applies completed step styling', () => {
    render(<OrderStatusTimeline currentStatus="Preparing" />);

    const completedLabel = screen.getByText('Order Received');
    expect(completedLabel).toHaveClass('line-through');

    const completedCircle = completedLabel
      .closest('li')
      .querySelector('.border-primary.bg-primary');
    expect(completedCircle).toBeInTheDocument();
  });

  it('applies pulse animation class on the current step', () => {
    render(<OrderStatusTimeline currentStatus="Preparing" />);

    const currentLabel = screen.getByText('Preparing');
    const currentLi = currentLabel.closest('li');
    expect(currentLi.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('greys out upcoming steps', () => {
    render(<OrderStatusTimeline currentStatus="Preparing" />);

    const upcomingLabel = screen.getByText('Out for Delivery');
    expect(upcomingLabel).toHaveClass('text-gray-400');

    const upcomingCircle = upcomingLabel
      .closest('li')
      .querySelector('.border-gray-300');
    expect(upcomingCircle).toBeInTheDocument();
  });
});
