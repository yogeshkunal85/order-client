import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '../api/orders';
import Navbar from '../components/Navbar';
import OrderStatusTimeline from '../components/OrderStatusTimeline';
import { useOrderStatus } from '../hooks/useOrderStatus';
import { getEstimatedTime } from '../utils/orderStatus';

export default function OrderTrackingPage() {
  const { id } = useParams();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await fetchOrder(id);
      return res.data;
    },
    enabled: Boolean(id),
  });

  const { currentStatus, isConnected } = useOrderStatus(id, order?.status);

  const displayStatus = currentStatus ?? order?.status;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => {}} />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          ← Order more food
        </Link>

        {isLoading && (
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            Order not found.
            <Link to="/" className="mt-2 block text-primary hover:underline">
              Back to menu
            </Link>
          </div>
        )}

        {order && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
              <p className="mt-1 text-sm text-gray-500">
                Order #{order.id.slice(0, 8)}…
              </p>
              <p className="mt-3 text-lg font-medium text-gray-900">
                Hi, {order.customerName}
              </p>
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Order Summary
                </h2>
                <ul className="space-y-1 text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.menuItemId} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-gray-100 pt-3 font-semibold text-primary">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Delivery Status</h2>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isConnected
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isConnected ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  {isConnected ? 'Live' : 'Connecting…'}
                </span>
              </div>

              <p className="mb-1 text-sm font-medium text-primary">
                {displayStatus}
              </p>
              <p className="mb-8 text-sm text-gray-500">
                {getEstimatedTime(displayStatus)}
              </p>

              <OrderStatusTimeline currentStatus={displayStatus} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
