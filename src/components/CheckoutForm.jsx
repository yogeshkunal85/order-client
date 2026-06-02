import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const checkoutSchema = z.object({
  customerName: z.string().min(1, 'Full name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
});

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      address: '',
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="customerName" className="mb-1 block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="customerName"
          type="text"
          {...register('customerName')}
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 ${
            errors.customerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Jane Doe"
        />
        {errors.customerName && (
          <p className="mt-1 text-sm text-red-500">{errors.customerName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          {...register('address')}
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main St, Apt 4"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          {...register('phone')}
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="9876543210"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Placing Order…
          </span>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}
