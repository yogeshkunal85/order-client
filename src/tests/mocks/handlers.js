import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:3000/api';

export const mockMenuItems = [
  {
    id: 'burger-1',
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheddar',
    price: 9.99,
    imageUrl: 'https://example.com/burger.jpg',
    category: 'Burgers',
  },
  {
    id: 'burger-2',
    name: 'BBQ Bacon Burger',
    description: 'Smoky BBQ sauce with bacon',
    price: 11.99,
    imageUrl: 'https://example.com/bbq.jpg',
    category: 'Burgers',
  },
  {
    id: 'pizza-1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella and basil',
    price: 12.99,
    imageUrl: 'https://example.com/pizza.jpg',
    category: 'Pizza',
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Feast',
    description: 'Double pepperoni with extra cheese',
    price: 14.99,
    imageUrl: 'https://example.com/pepperoni.jpg',
    category: 'Pizza',
  },
];

export const mockOrder = {
  id: '11111111-1111-1111-1111-111111111111',
  customerName: 'Jane Doe',
  address: '123 Main St',
  phone: '9876543210',
  items: [
    {
      menuItemId: 'burger-1',
      name: 'Classic Cheeseburger',
      price: 9.99,
      quantity: 2,
    },
  ],
  totalAmount: 19.98,
  status: 'Order Received',
  createdAt: '2026-06-02T12:00:00.000Z',
};

export const handlers = [
  http.get(`${API_URL}/menu`, () => {
    return HttpResponse.json(mockMenuItems);
  }),

  http.post(`${API_URL}/orders`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        ...mockOrder,
        customerName: body.customerName ?? mockOrder.customerName,
        address: body.address ?? mockOrder.address,
        phone: body.phone ?? mockOrder.phone,
        items: body.items ?? mockOrder.items,
        status: 'Order Received',
      },
      { status: 201 }
    );
  }),

  http.get(`${API_URL}/orders/:id`, ({ params }) => {
    return HttpResponse.json({
      ...mockOrder,
      id: params.id,
    });
  }),
];
