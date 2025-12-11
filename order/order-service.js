const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load protos
const productPackageDef = protoLoader.loadSync(
  path.join(__dirname, "../product/product.proto")
);
const productGrpcObj = grpc.loadPackageDefinition(productPackageDef);
const productPackage = productGrpcObj.product;

const orderPackageDef = protoLoader.loadSync(
  path.join(__dirname, "order.proto")
);
const orderGrpcObj = grpc.loadPackageDefinition(orderPackageDef);
const orderPackage = orderGrpcObj.order;

// gRPC client for product service
const productClient = new productPackage.ProductService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const orderServer = new grpc.Server();
let orders = [];

orderServer.addService(orderPackage.OrderService.service, {
  CreateOrder: (call, callback) => {
    const productId = call.request.productId;

    productClient.GetProduct({ productId }, (err, product) => {
      if (err) return callback(err);

      const order = {
        orderId: orders.length + 1,
        status: "placed",
        productName: product.name,
        productPrice: product.price,
      };
      orders.push(order);

      callback(null, order);
    });
  },
  GetAllOrders: (call, callback) => {
    callback(null, { orders });
  },
});

orderServer.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  () => {
    orderServer.start();
    console.log("OrderService running on port 50052");
  }
);
