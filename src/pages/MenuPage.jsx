import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../api/menu';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import MenuSkeleton from '../components/MenuSkeleton';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { useCart } from '../hooks/useCart';

export default function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });
  const { addItem } = useCart();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await fetchMenu();
      return res.data;
    },
  });

  function handleAdd(item) {
    addItem(item);
    setToast({ message: `${item.name} added to cart`, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast message={toast.message} visible={toast.visible} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Menu</h1>
          <p className="mt-1 text-gray-500">Fresh burgers and pizzas delivered to your door</p>
        </div>

        {isLoading && <MenuSkeleton />}

        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">
              {error?.message || 'Failed to load menu. Is the API running?'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
            >
              Try Again
            </button>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
