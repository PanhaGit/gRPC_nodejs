const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const app = express();
const PORT = 3000;

// Load protos
const productPackageDef = protoLoader.loadSync(
  path.join(__dirname, "./product/product.proto")
);
const productGrpcObj = grpc.loadPackageDefinition(productPackageDef);
const productPackage = productGrpcObj.product;

const orderPackageDef = protoLoader.loadSync(
  path.join(__dirname, "./order/order.proto")
);
const orderGrpcObj = grpc.loadPackageDefinition(orderPackageDef);
const orderPackage = orderGrpcObj.order;

// gRPC clients producty
const productClient = new productPackage.ProductService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

//gRPC clients order
const orderClient = new orderPackage.OrderService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

// REST endpoints
app.get("/products", (req, res) => {
  productClient.GetAllProducts({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.products);
  });
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productClient.GetProduct({ productId: id }, (err, response) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(response);
  });
});

app.post("/orders", (req, res) => {
  const productId = parseInt(req.query.productId || 1);
  orderClient.CreateOrder({ productId }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

app.get("/get_order", (req, res) => {
  orderClient.GetAllOrders({}, (error, response) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    } else {
      return res.status(200).json({
        data: response.orders || [],
        code: 200,
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`API Gateway running at http://localhost:${PORT}`)
);
