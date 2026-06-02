export const ORDER_STATUSES = [
  'Order Received',
  'Preparing',
  'Out for Delivery',
  'Delivered',
];

export function getStatusIndex(status) {
  return ORDER_STATUSES.indexOf(status);
}

export function getEstimatedTime(status) {
  switch (status) {
    case 'Order Received':
      return 'Estimated prep starts in ~1 min';
    case 'Preparing':
      return 'Estimated ready in ~15 min';
    case 'Out for Delivery':
      return 'Estimated arrival in ~15 min';
    case 'Delivered':
      return 'Enjoy your meal!';
    default:
      return 'Updating estimate…';
  }
}
