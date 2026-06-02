export default function Toast({ message, visible }) {
  if (!visible || !message) return null;

  return (
    <div
      className="animate-toast-in fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}
