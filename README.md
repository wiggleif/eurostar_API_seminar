# E-Commerce API - Eurostar

## Description

This is a REST API for an e-commerce application built with **Node.js** and **Express.js**. The API provides user authentication with JWT tokens, product management, and a checkout system with payment flexibility (cash or credit card). All data is stored in memory, making it lightweight and perfect for development and testing purposes.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Steps

1. **Clone the repository** (if not already cloned)
   ```bash
   git clone <repository-url>
   cd ecommerce-eurostar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install the following packages:
   - **express**: Web framework
   - **jsonwebtoken**: JWT token generation and validation
   - **bcryptjs**: Password hashing (for future enhancement)

## How to Run

### Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

### Verify Server is Running

Check the health endpoint:
```bash
curl http://localhost:3000/api/healthcheck
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-06-15T12:00:00.000Z"
}
```

## Rules

### Checkout Rules
1. **Payment Methods**: Only **cash** or **credit_card** are accepted
2. **Cash Discount**: Customers paying with cash receive a **10% discount** on the total amount
3. **Authentication Required**: Only authenticated users can perform checkout
4. **Credit Card**: No discount applied for credit card payments
5. **Inventory**: Products are deducted from inventory upon successful checkout

### API Rules
1. All endpoints require valid JSON request bodies
2. Authentication is required for the checkout endpoint (JWT token)
3. Endpoints return standard JSON responses with `success` flag
4. All data is stored in memory and will be reset when the server restarts

## Existent Data

### Pre-loaded Users (3 users)

| ID | Email | Password | Name |
|---|---|---|---|
| 1 | user1@example.com | password123 | John Doe |
| 2 | user2@example.com | password456 | Jane Smith |
| 3 | user3@example.com | password789 | Bob Johnson |

### Pre-loaded Products (3 products)

| ID | Name | Description | Price | Quantity |
|---|---|---|---|---|
| 1 | Laptop | High-performance laptop for professionals | $999.99 | 50 |
| 2 | Wireless Mouse | Ergonomic wireless mouse with USB receiver | $29.99 | 200 |
| 3 | USB-C Cable | 6ft USB-C to USB-C charging cable | $12.99 | 500 |

## How to Use the Rest API

### API Endpoints

#### 1. Health Check
- **Endpoint**: `GET /api/healthcheck`
- **Description**: Verify API is running
- **Authentication**: Not required
- **Request**:
  ```bash
  curl http://localhost:3000/api/healthcheck
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "API is running",
    "timestamp": "2026-06-15T12:00:00.000Z"
  }
  ```

---

#### 2. Register
- **Endpoint**: `POST /api/auth/register`
- **Description**: Create a new user account
- **Authentication**: Not required
- **Request Headers**:
  ```
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "mypassword",
    "name": "New User"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "email": "newuser@example.com",
      "password": "mypassword",
      "name": "New User"
    }'
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "data": {
      "user": {
        "id": 4,
        "email": "newuser@example.com",
        "name": "New User"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Response** (400):
  ```json
  {
    "success": false,
    "message": "User already exists"
  }
  ```

---

#### 3. Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Authentication**: Not required
- **Request Headers**:
  ```
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "email": "user1@example.com",
    "password": "password123"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "user1@example.com",
      "password": "password123"
    }'
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "email": "user1@example.com",
        "name": "John Doe"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Response** (401):
  ```json
  {
    "success": false,
    "message": "Invalid password"
  }
  ```

---

#### 4. Checkout
- **Endpoint**: `POST /api/checkout/checkout`
- **Description**: Perform checkout with items and payment method
- **Authentication**: **REQUIRED** (Bearer Token)
- **Request Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer <your_jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "items": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 1
      }
    ],
    "paymentMethod": "cash"
  }
  ```
- **Example** (with cash payment - 10% discount):
  ```bash
  curl -X POST http://localhost:3000/api/checkout/checkout \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
    -d '{
      "items": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 3,
          "quantity": 2
        }
      ],
      "paymentMethod": "cash"
    }'
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Checkout successful",
    "data": {
      "orderId": "ORD-1718454000000",
      "userId": 1,
      "userName": "John Doe",
      "userEmail": "user1@example.com",
      "items": [
        {
          "productId": 1,
          "productName": "Laptop",
          "price": 999.99,
          "quantity": 1,
          "total": 999.99
        },
        {
          "productId": 3,
          "productName": "USB-C Cable",
          "price": 12.99,
          "quantity": 2,
          "total": 25.98
        }
      ],
      "subtotal": 1025.97,
      "discount": 102.60,
      "total": 923.37,
      "paymentMethod": "cash",
      "status": "completed",
      "createdAt": "2026-06-15T12:00:00.000Z"
    }
  }
  ```
- **Example** (with credit card - no discount):
  ```bash
  curl -X POST http://localhost:3000/api/checkout/checkout \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
    -d '{
      "items": [
        {
          "productId": 2,
          "quantity": 3
        }
      ],
      "paymentMethod": "credit_card"
    }'
  ```
- **Error Response** (401 - No token):
  ```json
  {
    "success": false,
    "message": "No token provided. Please authenticate."
  }
  ```
- **Error Response** (400 - Invalid payment method):
  ```json
  {
    "success": false,
    "message": "Invalid payment method. Accepted: cash, credit_card"
  }
  ```

#### 5. Swagger Documentation
- **Endpoint**: `GET /api/swagger`
- **Description**: Renders the Swagger UI for this API
- **Authentication**: Not required
- **Example**:
  ```bash
  # Open in browser
  http://localhost:3000/api/swagger
  ```
- **Raw OpenAPI spec**: `GET /api/swagger/spec`
  ```bash
  curl http://localhost:3000/api/swagger/spec
  ```

---

## Complete Workflow Example

### Step 1: Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "securepass123",
    "name": "Alice Johnson"
  }'
```

### Step 2: Login (or use token from registration)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "securepass123"
  }'
```
*Save the token from the response*

### Step 3: Perform checkout with cash payment (10% discount)
```bash
curl -X POST http://localhost:3000/api/checkout/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_step_2>" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 2
      }
    ],
    "paymentMethod": "cash"
  }'
```

---

## Project Structure

```
ecommerce-eurostar/
├── swagger.json                    # OpenAPI specification
├── src/
│   ├── controllers/
│   │   ├── AuthController.js       # Handles login and register
│   │   ├── CheckoutController.js   # Handles checkout
│   │   └── SwaggerController.js    # Serves Swagger UI and spec
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                 # User model with in-memory storage
│   │   └── Product.js              # Product model with in-memory storage
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── checkoutRoutes.js       # Checkout endpoints
│   │   ├── healthRoutes.js         # Health check endpoint
│   │   └── swaggerRoutes.js        # Swagger documentation endpoints
│   ├── services/
│   │   ├── AuthService.js          # Authentication business logic
│   │   ├── CheckoutService.js      # Checkout business logic
│   │   └── SwaggerService.js       # Swagger file loading and UI
│   └── index.js                    # Main server file
├── package.json                    # Project dependencies
└── README.md                       # This file
```

---

## Notes

- **In-Memory Storage**: All data is stored in memory and will be lost when the server restarts
- **JWT Token Expiration**: Tokens expire after 24 hours
- **Security**: This is a demonstration API. For production use, implement proper security measures:
  - Use environment variables for secrets
  - Implement bcrypt for password hashing
  - Use HTTPS
  - Add rate limiting
  - Implement CORS properly
  - Use a real database

---

## License

ISC