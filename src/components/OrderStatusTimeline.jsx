import { ORDER_STATUSES, getStatusIndex } from '../utils/orderStatus';

export default function OrderStatusTimeline({ currentStatus }) {
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <ol className="relative space-y-0">
      {ORDER_STATUSES.map((status, index) => {
        const isCompleted = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isUpcoming = currentIndex < index;
        const isLast = index === ORDER_STATUSES.length - 1;

        return (
          <li key={status} className="relative flex gap-4 pb-10 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${
                  isCompleted ? 'bg-primary' : 'bg-gray-200'
                }`}
                aria-hidden
              />
            )}

            <div className="relative z-10 flex shrink-0 flex-col items-center">
              {isCurrent && (
                <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-primary/40" />
              )}
              <span
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? 'border-primary bg-primary text-white'
                    : isCurrent
                      ? 'border-primary bg-white'
                      : 'border-gray-300 bg-white'
                }`}
              >
                {isCompleted && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isCurrent && (
                  <span className="h-3 w-3 rounded-full bg-primary" />
                )}
              </span>
            </div>

            <div className="pt-0.5">
              <p
                className={`font-medium ${
                  isUpcoming ? 'text-gray-400' : 'text-gray-900'
                } ${isCompleted ? 'line-through decoration-primary/60' : ''}`}
              >
                {status}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
