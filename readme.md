# GRPC Test Project

This project demonstrates a **gRPC microservice** for products and orders, along with a **REST API gateway** to access the services via HTTP.

---

## Project Structure

grpc-test/
├── product/
│ ├── product.proto
│ └── product-service.js
├── order/
│ ├── order.proto
│ └── order-service.js
├── test-client.js
├── api-gateway.js
├── package.json
└── .gitignore

yaml
Copy code

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd grpc-test
Install dependencies:

bash
Copy code
npm install
Running the Services
1. Product Service (gRPC)
bash
Copy code
node product/product-service.js
Runs on port 50051.

2. Order Service (gRPC)
bash
Copy code
node order/order-service.js
Runs on port 50052.

3. REST API Gateway
bash
Copy code
node api-gateway.js
Runs on port 3000.

Testing the APIs
Using gRPC Client (Node.js)
Run:

bash
Copy code
node test-client.js
Expected output:

text
Copy code
GetProduct Response: { id: 1, name: 'T-Shirt', price: 20 }
GetAllProducts Response: [
  { id: 1, name: 'T-Shirt', price: 20 },
  { id: 2, name: 'Shoes', price: 50 }
]
Using Postman / HTTP Requests
Get all products
bash
Copy code
GET http://localhost:3000/products
Get single product
bash
Copy code
GET http://localhost:3000/products/1
Create an order
bash
Copy code
POST http://localhost:3000/orders
Body (JSON):
{
  "productId": 1
}
Notes
product-service.js handles product data via gRPC.

order-service.js creates orders using gRPC and fetches product info from Product Service.

api-gateway.js exposes REST endpoints to access the gRPC services.

In-memory data is used for testing. No database is connected yet.

yaml
Copy code

---

I can also prepare a **`curl-test.sh` file** so you can test all endpoints quickly from the command line.

Do you want me to create that file?
```
