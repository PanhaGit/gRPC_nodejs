#!/bin/bash

# Test REST API Gateway Endpoints

echo "=========================="
echo "GET all products"
curl -s http://localhost:3000/products | jq
echo -e "\n=========================="

echo "GET product by ID (1)"
curl -s http://localhost:3000/products/1 | jq
echo -e "\n=========================="

echo "GET product by ID (2)"
curl -s http://localhost:3000/products/2 | jq
echo -e "\n=========================="

echo "POST create order for productId=1"
curl -s -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1}' | jq
echo -e "\n=========================="

echo "POST create order for productId=2"
curl -s -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 2}' | jq
echo -e "\n=========================="

echo "GET invalid product (id=999)"
curl -s http://localhost:3000/products/999 | jq
echo -e "\n=========================="
