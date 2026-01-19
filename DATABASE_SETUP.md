# Dairy Shop - Full Stack E-commerce Website

This project combines a React frontend (Vite) with an Express backend and MongoDB database.

## Features

✅ Product Management (Milk, Cheese, Butter, Yogurt, Ghee)
✅ Shopping Cart & Wishlist
✅ User Authentication (ready to implement)
✅ Orders Management
✅ Subscription Plans
✅ Indian Rupee (₹) Currency
✅ REST API with MongoDB
✅ Responsive Design with Tailwind CSS

## Project Structure

```
MY WEBSITE/
├── src/                    # React Frontend (Vite)
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   └── App.tsx
├── backend/               # Express Backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── config/
├── server.ts             # Express server entry point
├── seed.ts               # Database seeding script
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env                  # Environment variables
```

## Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud connection)

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup MongoDB:**
   - Install MongoDB locally, OR
   - Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Update `MONGODB_URI` in `.env` file

3. **Configure Environment:**
   
   `.env` file (backend):
   ```
   MONGODB_URI=mongodb://localhost:27017/dairy-shop
   PORT=5000
   NODE_ENV=development
   ```

   `.env.local` file (frontend):
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the Project

### Option 1: Run Frontend Only (with mock data)
```bash
npm run dev
```
Opens: http://localhost:5173

### Option 2: Run Backend Only
```bash
npm run dev:server
```
Server runs on: http://localhost:5000

### Option 3: Run Both (Recommended)

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 4: Production Build
```bash
npm run build
npm start
```

## Seed Database with Sample Products

After MongoDB is running, seed the database with sample products:

```bash
npm run seed
```

This will:
- Clear existing products
- Insert 8 sample dairy products (all in Indian Rupees)
- Display success message

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `POST /api/cart/:userId/remove` - Remove item from cart
- `POST /api/cart/:userId/clear` - Clear cart

### Wishlist
- `GET /api/wishlist/:userId` - Get wishlist
- `POST /api/wishlist/:userId/add` - Add to wishlist
- `POST /api/wishlist/:userId/remove` - Remove from wishlist

### Orders
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

### Subscriptions
- `GET /api/subscriptions` - Get all plans
- `GET /api/subscriptions/user/:userId` - Get user subscriptions
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `POST /api/subscriptions/:id/cancel` - Cancel subscription

## Testing with API

Use Postman or cURL to test endpoints:

```bash
# Get all products
curl http://localhost:5000/api/products

# Add to cart (replace userId and productId)
curl -X POST http://localhost:5000/api/cart/user123/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"<product-id>","quantity":2}'

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","items":[...],"totalAmount":1000,"shippingAddress":"123 Main St","paymentMethod":"card"}'
```

## Frontend Usage

1. Products automatically load from API when page loads
2. Add items to cart (stored in React state)
3. Add items to wishlist
4. View featured products on home page
5. Filter products by category
6. All prices displayed in Indian Rupees (₹)

## Next Steps to Complete

- [ ] User authentication (signup/login)
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Order history page
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Review & rating system
- [ ] Deployment (Vercel for frontend, Railway/Heroku for backend)

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- Axios

**Backend:**
- Express.js
- MongoDB
- Mongoose
- Node.js
- TypeScript

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### Port Already in Use
- Backend (5000): `netstat -ano | findstr :5000` (Windows)
- Frontend (5173): Change in `vite.config.ts`

### API Calls Failing
- Ensure both frontend and backend are running
- Check `.env.local` for correct API URL
- Open browser DevTools → Network tab to see requests

## License

MIT

## Support

For issues or questions, check the backend console and browser DevTools for error messages.
