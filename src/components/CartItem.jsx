export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <li className="flex gap-3 border-b border-gray-100 py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.menuItemId, item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.menuItemId, item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
        <button
          type="button"
          onClick={() => onRemove(item.menuItemId)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
