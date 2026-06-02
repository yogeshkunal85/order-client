import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeItem } = useCart();

  function handleCheckout() {
    onClose();
    navigate('/checkout');
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-500">Your cart is empty</p>
              <p className="mt-1 text-sm text-gray-400">Add items from the menu to get started</p>
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <CartItem
                  key={item.menuItemId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="mb-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${totalAmount.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
