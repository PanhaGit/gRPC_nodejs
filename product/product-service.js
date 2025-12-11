const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync(path.join(__dirname, "product.proto"));
const grpcObj = grpc.loadPackageDefinition(packageDef);
const productPackage = grpcObj.product;

const server = new grpc.Server();

const products = [
  { id: 1, name: "T-Shirt", price: 20 },
  { id: 2, name: "Shoes", price: 50 },
];

server.addService(productPackage.ProductService.service, {
  GetProduct: (call, callback) => {
    const product = products.find((p) => p.id === call.request.productId);
    if (product) callback(null, product);
    else
      callback({ code: grpc.status.NOT_FOUND, message: "Product not found" });
  },
  GetAllProducts: (call, callback) => {
    callback(null, { products });
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log("ProductService running on port 50051");
  }
);
