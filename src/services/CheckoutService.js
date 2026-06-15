const Product = require('../models/Product');
const User = require('../models/User');

class CheckoutService {
  static performCheckout(userId, items, paymentMethod) {
    // Validate payment method
    const validPaymentMethods = ['cash', 'credit_card'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error('Invalid payment method. Accepted: cash, credit_card');
    }

    // Verify user exists
    const user = User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate and calculate total
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (item.quantity > product.quantity) {
        throw new Error(`Insufficient quantity for product ${product.name}`);
      }

      if (item.quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal
      });

      // Reduce product quantity
      Product.updateQuantity(product.id, item.quantity);
    }

    // Calculate discount
    let discount = 0;
    if (paymentMethod === 'cash') {
      discount = subtotal * 0.10; // 10% discount for cash
    }

    const total = subtotal - discount;

    // Create order object
    const order = {
      orderId: `ORD-${Date.now()}`,
      userId,
      userName: user.name,
      userEmail: user.email,
      items: orderItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      paymentMethod,
      status: 'completed',
      createdAt: new Date()
    };

    return order;
  }
}

module.exports = CheckoutService;
