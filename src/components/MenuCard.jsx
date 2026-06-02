const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop';

export default function MenuCard({ item, onAdd }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={item.imageUrl || FALLBACK_IMAGE}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {item.category && (
          <span className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
            {item.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
