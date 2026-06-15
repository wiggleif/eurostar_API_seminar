const CheckoutService = require('../services/CheckoutService');

class CheckoutController {
  static async checkout(req, res) {
    try {
      const { items, paymentMethod } = req.body;
      const userId = req.user.id;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Items array is required and must not be empty'
        });
      }

      if (!paymentMethod) {
        return res.status(400).json({
          success: false,
          message: 'Payment method is required'
        });
      }

      // Validate items structure
      for (const item of items) {
        if (!item.productId || !item.quantity) {
          return res.status(400).json({
            success: false,
            message: 'Each item must have productId and quantity'
          });
        }
      }

      const order = CheckoutService.performCheckout(userId, items, paymentMethod);

      return res.status(200).json({
        success: true,
        message: 'Checkout successful',
        data: order
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = CheckoutController;
