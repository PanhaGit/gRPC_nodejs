GRPC Test Project

This project demonstrates a gRPC microservice for products and orders, along with a REST API gateway to access the services via HTTP.

Project Structure
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

Installation

Clone the repository:

git clone <your-repo-url>
cd grpc-test

Install dependencies:

npm install

Running the Services

Product Service (gRPC)

node product/product-service.js

Runs on port 50051.

Order Service (gRPC)

node order/order-service.js

Runs on port 50052.

REST API Gateway

node api-gateway.js

Runs on port 3000.

Testing the APIs
Using gRPC Client (Node.js)

Run:

node test-client.js

Expected output:

GetProduct Response: { id: 1, name: 'T-Shirt', price: 20 }
GetAllProducts Response: [
{ id: 1, name: 'T-Shirt', price: 20 },
{ id: 2, name: 'Shoes', price: 50 }
]

Using Postman / HTTP Requests

Get all products

GET http://localhost:3000/products

Get single product

GET http://localhost:3000/products/1

Create an order

POST http://localhost:3000/orders
Body (JSON):
{
"productId": 1
}
