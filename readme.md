# GRPC Test Project

This project demonstrates a **gRPC microservice** for products and orders, along with a **REST API gateway** to access the services via HTTP.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PanhaGit/gRPC_nodejs.git
cd grpc-test
npm i or npm install
```

```bash
Copy code
npm install
Running the Services
Product Service (gRPC)
```

```bash
Copy code
node product/product-service.js
Runs on port 50051.
```

Order Service (gRPC)

```bash
Copy code
node order/order-service.js
Runs on port 50052.
```

REST API Gateway

```bash
Copy code
node api-gateway.js
Runs on port 3000.
```

Testing the APIs
Using gRPC Client (Node.js)
Run:

bash
node test-client.js
Expected output:

```
GetProduct Response: { id: 1, name: 'T-Shirt', price: 20 }
GetAllProducts Response: [
  { id: 1, name: 'T-Shirt', price: 20 },
  { id: 2, name: 'Shoes', price: 50 }
]
Using Postman / HTTP Requests
Get all products
```

```bash
GET http://localhost:3000/products
Get single product
```

```bash
GET http://localhost:3000/products/1
Create an order
```

```bash
POST http://localhost:3000/orders
Body (JSON):
{
  "productId": 1
}
```
