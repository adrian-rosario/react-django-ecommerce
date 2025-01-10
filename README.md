<a id='top'></a>

# react-django-ecommerce

Building along with Udemy [Django with React | An Ecommerce Website](https://www.udemy.com/course/django-with-react-an-ecommerce-website) by Dennis Ivy, Brad Traversy

- **Backend**: Django Rest Framework, Simple JWT, Pillow. [Source code](https://github.com/adrian-rosario/react-django/tree/main/ecommerce/backend/sales_platform)

  - API Documentation: [Order API](#api-order), [Product API](#api-products), [User API](#api-user)

- **Frontend**: React, React Router, React Bootstrap, Font Awesome, React-Paypal, Axios, Redux. [Source code](https://github.com/adrian-rosario/react-django/tree/main/ecommerce/frontend/ecomm-frontend-app)
- **Database**: SQLite

## Usage

Users can browse the inventory and Search for items. Logged in users can add to cart and submit reviews. Admins can manage users, products, and orders. Product images can be used from the React `/public/images/` folder or uploaded.

<div style="display: flex;">
<div>
<img src="/screenshots/01-home.png" style="width:200px;" />
<img src="/screenshots/02-home-page-2.png" style="width:200px;" />
<img src="/screenshots/03-product.png" style="width:200px;" />
<img src="/screenshots/03-product-no-reviews.png" style="width:200px;" />
<img src="/screenshots/03-product-review-form.png" style="width:200px;" />
<img src="/screenshots/04-search.png" style="width:200px;" />
<img src="/screenshots/05-login.png" style="width:200px;" />
<img src="/screenshots/07-cart-user.png" style="width:200px;" />
<img src="/screenshots/08-shipping-user.png" style="width:200px;" />
<img src="/screenshots/09-payment-user.png" style="width:200px;" />
<img src="/screenshots/10-place-order-user.png" style="width:200px;" />
<img src="/screenshots/11-order-chargers-user.png" style="width:200px;" />
<img src="/screenshots/12-order-paid-user.png" style="width:200px;" />
<img src="/screenshots/13-profile-user.png" style="width:200px;" />
<img src="/screenshots/14-all-orders-admin.png" style="width:200px;" />
<img src="/screenshots/15-order-as-paid-admin.png" style="width:200px;" />
<img src="/screenshots/16-order-shipped-admin.png" style="width:200px;" />
<img src="/screenshots/17-all-users-admin.png" style="width:200px;" />
<img src="/screenshots/18-all-products-admin.png" style="width:200px;" />
<img src="/screenshots/19-edit-product-admin.png" style="width:200px;" />
</div>
</div>

### **Backend, Django**

```plaintext
backend/
├── sales_platform/          # Main Django project folder
│   ├── settings.py         # Django settings
│   ├── urls.py             # Main URL routing
│   ├── wsgi.py             # WSGI entry point for deployment
│
├── ecomm_app/              # Django app folder
│   ├── migrations/         # Database migration files
│   ├── models.py           # Database models
│   ├── views/              # API views
│   ├── urls/               # URL routing
│   ├── serializers.py      # Data serializers for the API
│
├── static/                # User uploaded images
├── manage.py              # Django management commands
└── requirements.txt       # Project dependencies
```

#### **Django Setup Instructions**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/adrian-rosario/react-django-ecommerce.git
   cd backend/
   ```

2. **Create a virtual environment** (optional, but recommended):

   ```bash
   virtualenv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   cd ./sales_platform/
   pip install -r requirements.txt
   ```

4. **Add an environment variable to your system**:

   ```bash
   export ECOMM_APP_KEY="yourSecretKey"
   ```

5. **Run migrations**:

   ```bash
   python manage.py migrate
   ```

6. **Create a superuser**:

   ```bash
   python manage.py createsuperuser
   ```

7. **Start the backend server**:

   ```bash
   python manage.py runserver
   ```

8. **Access the backend**:

   - The API will be available at `http://127.0.0.1:8000/`

9. **Admin panel**:
   Create initial products and users. The admin panel can be accessed with the superuser credentials at `http://127.0.0.1:8000/admin`

10. **API Documentation**: [Order API](#api-order), [Product API](#api-products), [User API](#api-user)

---

### **Frontend, React**

```plaintext
frontend/
├──── src/
├────── assets/             # Images
├────── components/
├──────── views/            # Pages
├────── state/
├──────── actions/          # Actions
├──────── reducers/         # Reducers reducers
├────── util/               # Constants
└──
```

#### **React Setup Instructions**

1. **Clone the repository, if not already cloned**:

   ```bash
   git clone https://github.com/adrian-rosario/react-django-ecommerce.git
   cd frontend/ecomm-frontend-app/
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend server**:

   ```bash
   npm run start
   ```

4. **Access the frontend**:
   - The React application will be available at `http://localhost:3000/`.

---

<a id="api-order"></a>
[Top](#top)

## API Endpoints, Order

### GET /order/view/{order_id}

- **Description**: Retrieve order by id
- **Authentication**: Yes, user
- **Request Body**: None
- **Response**:

```json
{
  "id": 65,
  "order": [
    {
      "id": 81,
      "name": "Sony Playstation 4 Pro White Version",
      "quantity": 1,
      "price": "399.99",
      "image": "/images/playstation.jpg",
      "product": 4,
      "order": 65
    },
    {
      "id": 82,
      "name": "Cannon EOS 80D DSLR Camera",
      "quantity": 1,
      "price": "929.00",
      "image": "/images/camera.jpg",
      "product": 3,
      "order": 65
    }
  ],
  "shippingAddress": {
    "id": 63,
    "address": "1313 Mockingbird Ln.",
    "city": "New York, NY",
    "zipCode": "11221",
    "country": "United States",
    "shippingCharge": "0.00",
    "order": 65
  },
  "user": {
    "id": 1,
    "username": "tom@ecommerceapp.com",
    "email": "tom@ecommerceapp.com",
    "name": "Tom",
    "is_admin": true
  },
  "paymentMethod": "PayPal",
  "taxPrice": 109.64,
  "shippingPrice": 0.0,
  "totalPrice": 1438.63,
  "isPaid": false,
  "paidDate": null,
  "isDelivered": false,
  "deliveredAt": null,
  "createdAt": "2025-01-09T19:38:22.020687Z"
}
```

### GET /order/view/orders/

- **Description**: Retrieve user orders
- **Authentication**: Yes, user
- **Request Body**: None
- **Response**:

```json
[
  {
    "id": 51,
    "order": [
      {
        "id": 64,
        "name": "Logitech G-Series Gaming Mouse",
        "quantity": 1,
        "price": "49.99",
        "image": "/images/mouse.jpg",
        "product": 5,
        "order": 51
      }
    ],
    "shippingAddress": {
      "id": 49,
      "address": "1790 Broadway",
      "city": "New York",
      "zipCode": "10019",
      "country": "United States",
      "shippingCharge": "10.00",
      "order": 51
    },
    "user": {
      "id": 2,
      "username": "tim@ecommerceapp.com",
      "email": "tim@ecommerceapp.com",
      "name": "Tim B",
      "is_admin": false
    },
    "paymentMethod": "PayPal",
    "taxPrice": 4.12,
    "shippingPrice": 10.0,
    "totalPrice": 64.11,
    "isPaid": true,
    "paidDate": "2024-12-16T20:49:13.929258Z",
    "isDelivered": true,
    "deliveredAt": "2024-12-20T19:34:59.595496Z",
    "createdAt": "2024-12-16T20:47:34.753341Z"
  },
  {
    "id": 52,
    "order": [
      {
        "id": 65,
        "name": "Logitech G-Series Gaming Mouse",
        "quantity": 4,
        "price": "49.99",
        "image": "/images/mouse.jpg",
        "product": 5,
        "order": 52
      }
    ],
    "shippingAddress": {
      "id": 50,
      "address": "1790 Broadway",
      "city": "New York",
      "zipCode": "10019",
      "country": "United States",
      "shippingCharge": "0.00",
      "order": 52
    },
    "user": {
      "id": 2,
      "username": "tim@ecommerceapp.com",
      "email": "tim@ecommerceapp.com",
      "name": "Tim B",
      "is_admin": false
    },
    "paymentMethod": "PayPal",
    "taxPrice": 16.5,
    "shippingPrice": 0.0,
    "totalPrice": 216.46,
    "isPaid": false,
    "paidDate": null,
    "isDelivered": false,
    "deliveredAt": null,
    "createdAt": "2024-12-16T20:51:25.536583Z"
  },
  {
    "id": 53,
    "order": [
      {
        "id": 66,
        "name": "Sony Playstation 4 Pro White Version",
        "quantity": 1,
        "price": "399.99",
        "image": "/images/playstation.jpg",
        "product": 4,
        "order": 53
      }
    ],
    "shippingAddress": {
      "id": 51,
      "address": "1790 Broadway",
      "city": "New York",
      "zipCode": "10019",
      "country": "United States",
      "shippingCharge": "0.00",
      "order": 53
    },
    "user": {
      "id": 2,
      "username": "tim@ecommerceapp.com",
      "email": "tim@ecommerceapp.com",
      "name": "Tim B",
      "is_admin": false
    },
    "paymentMethod": "PayPal",
    "taxPrice": 33.0,
    "shippingPrice": 0.0,
    "totalPrice": 432.99,
    "isPaid": false,
    "paidDate": null,
    "isDelivered": false,
    "deliveredAt": null,
    "createdAt": "2024-12-16T21:24:27.718796Z"
  }
]
```

### POST /order/

- **Description**: Place an order
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "cart": [
    {
      "product": 4,
      "name": "Sony Playstation 4 Pro White Version",
      "image": "/images/playstation.jpg",
      "price": 399.99,
      "countInStock": 11,
      "quantity": "1"
    },
    {
      "product": 3,
      "name": "Cannon EOS 80D DSLR Camera",
      "image": "/images/camera.jpg",
      "price": 929,
      "countInStock": 5,
      "quantity": "1"
    }
  ],
  "shippingAddress": {
    "address": "1313 Mockingbird Ln.",
    "city": "New York, NY",
    "postalCode": "11221",
    "country": "United States"
  },
  "shippingAmount": "0.00",
  "paymentMethod": "PayPal",
  "taxAmount": "109.64",
  "totalAmount": "1438.63"
}
```

- **Response**:

```json
{
  "id": 65,
  "order": [
    {
      "id": 81,
      "name": "Sony Playstation 4 Pro White Version",
      "quantity": 1,
      "price": "399.99",
      "image": "/images/playstation.jpg",
      "product": 4,
      "order": 65
    },
    {
      "id": 82,
      "name": "Cannon EOS 80D DSLR Camera",
      "quantity": 1,
      "price": "929.00",
      "image": "/images/camera.jpg",
      "product": 3,
      "order": 65
    }
  ],
  "shippingAddress": {
    "id": 63,
    "address": "1313 Mockingbird Ln.",
    "city": "New York, NY",
    "zipCode": "11221",
    "country": "United States",
    "shippingCharge": "0.00",
    "order": 65
  },
  "user": {
    "id": 1,
    "username": "tom@ecommerceapp.com",
    "email": "tom@ecommerceapp.com",
    "name": "Tom",
    "is_admin": true
  },
  "paymentMethod": "PayPal",
  "taxPrice": 109.64,
  "shippingPrice": 0,
  "totalPrice": 1438.63,
  "isPaid": false,
  "paidDate": null,
  "isDelivered": false,
  "deliveredAt": null,
  "createdAt": "2025-01-09T19:38:22.020687Z"
}
```

### PUT /order/shipped/{order_id}

- **Description**: Mark order as delivered
- **Authentication**: None
- **Request Body**: None
- **Response**:

```json
"Order set to delivered."
```

### DELETE /order/admin-view/delete/{order_id}

- **Description**: Delete order
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:

```json
"Order deleted"
```

---

<a id="api-products"></a>
[Top](#top)

## API Endpoints, Products

### GET /api/all-products/

- **Description**: List all products
- **Authentication**: None
- **Request Body**: None
- **Response**:

```json
{
  "products": [
    {
      "id": 1,
      "reviews": [],
      "name": "Airpods Wireless Bluetooth Headphones",
      "image": "/images/airpods.jpg",
      "uploadedImage": null,
      "description": "Bluetooth ...",
      "brand": "Apple",
      "category": "Electronics",
      "price": 89.99,
      "countInStock": 10,
      "rating": 4.5,
      "numReviews": 12,
      "createdAt": "2024-12-03T10:10:39.605308Z",
      "user": null
    }
  ]
}
```

### GET /api/top-products

- **Description**: List top products
- **Authentication**: None
- **Request Body**: None
- **Response**:

```json
[
  {
    "id": 4,
    "reviews": [],
    "name": "Sony Playstation 4 Pro White Version",
    "image": "/images/playstation.jpg",
    "uploadedImage": null,
    "description": "The ...",
    "brand": "Sony",
    "category": "Electronics",
    "price": 399.99,
    "countInStock": 11,
    "rating": 5.0,
    "numReviews": 12,
    "createdAt": "2024-12-03T10:10:39.605308Z",
    "user": null
  }
]
```

### GET /api/product/{product_id}

- **Description**: Get product by id
- **Authentication**: None
- **Request Body**: None
- **Response**:

```json
{
  "id": 6,
  "reviews": [
    {
      "id": 1,
      "name": "Tom",
      "rating": 3,
      "comment": "Great stuff\n",
      "createdAt": "2024-12-20T21:11:04.907433Z",
      "product": 6,
      "user": 1
    },
    {
      "id": 2,
      "name": "Tim B",
      "rating": 3,
      "comment": "Great stuff\n",
      "createdAt": "2024-12-20T21:11:04.907433Z",
      "product": 6,
      "user": 2
    }
  ],
  "name": "Amazon Echo Dot 3rd Generation",
  "image": "/images/alexa.jpg",
  "uploadedImage": null,
  "description": "Meet ...",
  "brand": "Amazon",
  "category": "Electronics",
  "price": 29.99,
  "countInStock": 0,
  "rating": 3.0,
  "numReviews": 2,
  "createdAt": "2024-12-03T10:10:39Z",
  "user": 3
}
```

- **Response**:

```json
{
  "id": 16,
  "name": "new item",
  "image": "",
  "description": "nothing",
  "brand": "apple",
  "category": "home furnishings",
  "price": 10.0,
  "countInStock": 20
}
```

- **Response**:

```json
{
  "id": 17,
  "reviews": [],
  "name": "new product new name",
  "image": "/images/shadow_none_icon.png",
  "uploadedImage": null,
  "description": "Enter item details.",
  "brand": "Radio Shack",
  "category": "Home Furnishings",
  "price": 1.0,
  "countInStock": 0,
  "rating": 0.0,
  "numReviews": 0,
  "createdAt": "2025-01-09T18:57:10.909756Z",
  "user": 1
}
```

### POST /api/admin/add-product/

- **Description**: Add product
- **Authentication**: Yes, admin
- **Request Body**:

```json
{
  "name": "new item",
  "image": "",
  "description": "nothing",
  "brand": "apple",
  "category": "home furnishings",
  "price": 10.0,
  "countInStock": 20
}
```

### POST /api/admin/upload-product-image/

- **Description**: Upload image
- **Authentication**: Yes, admin
- **Request Body**: None

```json
{
  "productId": "productId",
  "uploadedImage": "imageFile"
}
```

- **Response**:

```json
"Image uploaded successfully."
```

### POST /api/create-review/{item_id}

- **Description**: Add product review
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "rating": "3",
  "comment": "great, loved it"
}
```

- **Response**:

```json
["Rating added successfully"]
```

### PUT /api/admin/edit-product/{product_id}

- **Description**: Edit product
- **Authentication**: Yes, admin
- **Request Body**:

```json
{
  "id": 17,
  "name": "new product new name",
  "image": "/images/image_file.png",
  "description": "Enter item details.",
  "brand": "Radio Shack",
  "category": "Home Furnishings",
  "price": 1.0,
  "countInStock": 0
}
```

### DELETE /api/admin/delete-product/{product_id}

- **Description**: Delete product
- **Authentication**: Yes, Admin
- **Request Body**: None
- **Response**:

```json
"Product deleted"
```

---

<a id="api-user"></a>
[Top](#top)

## API Endpoints, User

### GET /user/profile/

- **Description**: List user details
- **Authentication**: Yes, user
- **Request Body**: None
- **Response**:

```json
{
  "id": 1,
  "username": "tom@ecommerceapp.com",
  "email": "tom@ecommerceapp.com",
  "name": "Tom",
  "is_admin": true
}
```

### GET /user/

- **Description**: List users
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:

```json
[
  {
    "id": 1,
    "username": "tom@ecommerceapp.com",
    "email": "tom@ecommerceapp.com",
    "name": "Tom",
    "is_admin": true
  },
  {
    "id": 2,
    "username": "tim@ecommerceapp.com",
    "email": "tim@ecommerceapp.com",
    "name": "Tim B",
    "is_admin": false
  }
]
```

### GET /user/admin/user-profile/{user_id}

- **Description**: Admin, get user profile
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:

```json
{
  "id": 6,
  "username": "joe@ecommerceapp.com",
  "email": "joe@ecommerceapp.com",
  "name": "joe Z",
  "is_admin": false
}
```

### POST /user/token/

- **Description**: Authenticate, get token
- **Authentication**: None
- **Request Body**:

```json
{
  "username": "userEmail",
  "password": "userPassword"
}
```

- **Response**:

```json
{
  "refresh": "jsonWebToken",
  "access": "jsonWebToken",
  "id": 1,
  "username": "tom@ecommerceapp.com",
  "email": "tom@ecommerceapp.com",
  "name": "Tom",
  "is_admin": true,
  "token": "jsonWebToken"
}
```

### POST /user/register/

- **Description**: Register new user
- **Authentication**: None
- **Request Body**: None

```json
{
  "name": "joe",
  "email": "joe@ecommerceapp.com",
  "password": "userPassword"
}
```

- **Response**:

```json
{
  "id": 6,
  "username": "joe@ecommerceapp.com",
  "email": "joe@ecommerceapp.com",
  "name": "joe",
  "is_admin": false,
  "token": "jsonWebToken"
}
```

### PUT /user/update/

- **Description**: Update user
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "name": "joe Z",
  "email": "joe@ecommerceapp.com",
  "password": ""
}
```

- **Response**:

```json
{
  "id": 6,
  "username": "joe@ecommerceapp.com",
  "email": "joe@ecommerceapp.com",
  "name": "joe Z",
  "is_admin": false,
  "token": "jsonWebToken"
}
```

### PUT /user/admin/update-user/{user_id}

- **Description**: Admin, update user profile
- **Authentication**: Yes, admin
- **Request Body**:

```json
{
  "username": "joe@ecommerceapp.com",
  "email": "joe@ecommerceapp.com",
  "name": "joe Z",
  "password": "",
  "is_admin": true
}
```

- **Response**:

```json
{
  "id": 6,
  "username": "joe@ecommerceapp.com",
  "email": "joe@ecommerceapp.com",
  "name": "joe Z",
  "is_admin": true
}
```

### DELETE /user/delete/{user_id}/

- **Description**: Delete user
- **Authentication**: Yes, user
- **Request Body**:

```json
"User deleted"
```

[Top](#top)
