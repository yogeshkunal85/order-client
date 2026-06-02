import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '../api/orders';
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/', { replace: true });
    }
  }, [items.length, navigate]);

  const mutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (res) => {
      clearCart();
      navigate(`/orders/${res.data.id}`, { replace: true });
    },
  });

  function handleSubmit(formData) {
    const payload = {
      customerName: formData.customerName,
      address: formData.address,
      phone: formData.phone,
      items: items.map((i) => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
      })),
    };
    mutation.mutate(payload);
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => navigate('/')} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          ← Back to menu
        </Link>

        <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Checkout</h1>

        {mutation.isError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {mutation.error?.response?.data?.message ||
              mutation.error?.response?.data?.errors?.[0]?.message ||
              'Failed to place order. Please try again.'}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.menuItemId} className="flex justify-between py-3 text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Delivery Details</h2>
            <CheckoutForm
              onSubmit={handleSubmit}
              isSubmitting={mutation.isPending}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
