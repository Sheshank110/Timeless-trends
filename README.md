# TIMELESS TRENDS

> **Style That Never Goes Out of Fashion.**

A production-ready, premium fashion e-commerce platform built with React, Node.js, MongoDB, and modern web technologies.

![TIMELESS TRENDS](client/src/assets/logo.jpg)

---

## ✨ Features

### Customer Experience
- 🛍️ **Shop** — Browse products with advanced filters, sorting, and search
- 👕 **Categories** — Men, Women, Teen with subcategories (T-Shirts, Shirts, Jeans, Hoodies, Jackets)
- 🔍 **Smart Search** — Debounced search with suggestions and recent searches
- ❤️ **Wishlist** — Save favorite products for later
- 🛒 **Cart** — Full cart with quantity management, size/color selection
- 💳 **Checkout** — Multi-step checkout with Razorpay integration
- 📦 **Order Tracking** — Visual timeline for order status
- ⭐ **Reviews** — Rate and review purchased products
- 🤖 **AI Stylist** — AI-powered fashion recommendations
- 👗 **Style Customizer** — Mix and match outfits visually

### Admin Dashboard
- 📊 **Analytics** — Sales, revenue, customer, and product analytics with charts
- 📦 **Product Management** — CRUD with image uploads to Cloudinary
- 🏷️ **Category Management** — Dynamic category system
- 📋 **Order Management** — View, update status, track payments
- 👥 **User Management** — View, manage, and assign roles
- 📦 **Inventory** — Stock management with low-stock alerts
- 🎫 **Coupon Management** — Create and manage discount codes
- ⭐ **Review Moderation** — Approve, reject, or delete reviews

### Technical
- 🔐 **Authentication** — JWT + HTTP-only cookies + refresh tokens
- 🛡️ **Security** — Helmet, CORS, rate limiting, input validation, bcrypt
- 📱 **Responsive** — Mobile-first design, works on all devices
- ⚡ **Performance** — Code splitting, lazy loading, image optimization
- 🔍 **SEO** — Meta tags, structured data, sitemap, robots.txt
- 💚 **WhatsApp** — Floating contact button

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS, Redux Toolkit, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcrypt, HTTP-only cookies |
| **Payments** | Razorpay (UPI, Cards, Net Banking, COD) |
| **Images** | Cloudinary |
| **Email** | Nodemailer (SMTP) |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |

---

## 📁 Project Structure

```
timeless-trends/
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Images, fonts
│   │   ├── components/     # Reusable components
│   │   │   ├── admin/      # Admin components
│   │   │   ├── cart/       # Cart components
│   │   │   ├── common/     # Shared components
│   │   │   ├── layout/     # Navbar, Footer, etc.
│   │   │   └── ui/         # Base UI components
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Route pages
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   └── utils/          # Utilities
│   └── public/             # Static assets
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # DB, env, cloudinary, email, razorpay
│   │   ├── controllers/    # Route controllers
│   │   ├── helpers/        # Token, email helpers
│   │   ├── middleware/     # Auth, admin, validation, error, rate limit
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # ApiError, ApiResponse, asyncHandler
│   │   └── validators/     # Zod schemas
│   └── tests/              # Backend tests
├── .env.example            # Environment variable template
├── .gitignore
├── package.json            # Monorepo root
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Razorpay account (test mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/timeless-trends.git
cd timeless-trends

# Install all dependencies
npm run install:all
```

### Environment Setup

Copy the example env file and fill in your credentials:

```bash
cp .env.example server/.env
```

Required variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:5173
```

### Development

```bash
# Run both frontend and backend
npm run dev

# Frontend only (http://localhost:5173)
npm run dev:client

# Backend only (http://localhost:5000)
npm run dev:server

# Seed database with sample data
npm run seed
```

### Production Build

```bash
npm run build:client
npm run build:server
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/forgot-password` | Send reset email |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/verify-email/:token` | Verify email |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (paginated, filterable) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Cart, Wishlist, Orders, Payments, Reviews, Users, Admin
See full API documentation in the codebase.

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd client
vercel --prod
```

### Backend → Render / Railway
Deploy the `server/` directory with:
- Build command: `npm install`
- Start command: `node src/index.js`

### Database → MongoDB Atlas
Use your Atlas connection string in the `MONGO_URI` environment variable.

---

## 📝 License

This project is proprietary. © 2025 TIMELESS TRENDS. All rights reserved.
