// In-memory storage for products
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop for professionals',
    price: 999.99,
    quantity: 50,
    createdAt: new Date('2026-01-01')
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    price: 29.99,
    quantity: 200,
    createdAt: new Date('2026-01-02')
  },
  {
    id: 3,
    name: 'USB-C Cable',
    description: '6ft USB-C to USB-C charging cable',
    price: 12.99,
    quantity: 500,
    createdAt: new Date('2026-01-03')
  }
];

let nextProductId = 4;

class Product {
  static findById(id) {
    return products.find(product => product.id === id);
  }

  static getAll() {
    return products;
  }

  static create(productData) {
    const newProduct = {
      id: nextProductId++,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      createdAt: new Date()
    };
    products.push(newProduct);
    return newProduct;
  }

  static updateQuantity(id, quantityToReduce) {
    const product = products.find(p => p.id === id);
    if (product) {
      product.quantity -= quantityToReduce;
    }
    return product;
  }
}

module.exports = Product;
