const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Size = require('../models/Size');
const ApiError = require('../error/ApiError');

class CartController {
  
  async createCart(req, res, next) {
    try {
      const { userId } = req.body;

      const cart = await Cart.create({ userId });
      return res.json(cart);
    } catch (error) {
      console.error('Error creating cart:', error);
      return next(ApiError.badRequest('Failed to create cart'));
    }
  }

  async addToCart(req, res, next) {
    try {
      const { cartId, productId, sizeId, quantity } = req.body;

      const product = await Product.findByPk(productId);
      const size = await Size.findByPk(sizeId);

      if (!product || !size) {
        return next(ApiError.badRequest('Product or Size not found'));
      }

      const price = product.price * size.priceMultiplier;

      const cartItem = await CartItem.create({
        cartId,
        productId,
        sizeId,
        quantity,
        price,
      });

      return res.json(cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      return next(ApiError.badRequest('Failed to add to cart'));
    }
  }

  async getCartItems(req, res, next) {
    try {
      const { cartId } = req.params;

      const cart = await Cart.findByPk(cartId, {
        include: {
          model: CartItem,
          include: [Product, Size],  
        }
      });

      if (!cart) {
        return next(ApiError.badRequest('Cart not found'));
      }

      return res.json(cart);
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      return next(ApiError.badRequest('Failed to retrieve cart items'));
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const { cartItemId, quantity } = req.body;

      const cartItem = await CartItem.findByPk(cartItemId);

      if (!cartItem) {
        return next(ApiError.badRequest('CartItem not found'));
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      return res.json(cartItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      return next(ApiError.badRequest('Failed to update cart item'));
    }
  }

  async removeCartItem(req, res, next) {
    try {
      const { cartItemId } = req.params;

      const cartItem = await CartItem.findByPk(cartItemId);

      if (!cartItem) {
        return next(ApiError.badRequest('CartItem not found'));
      }

      await cartItem.destroy();

      return res.json({ message: 'CartItem removed successfully' });
    } catch (error) {
      console.error('Error removing cart item:', error);
      return next(ApiError.badRequest('Failed to remove cart item'));
    }
  }

  async clearCart(req, res, next) {
    try {
      const { cartId } = req.params;

      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        return next(ApiError.badRequest('Cart not found'));
      }

      await CartItem.destroy({
        where: { cartId }
      });

      return res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      return next(ApiError.badRequest('Failed to clear cart'));
    }
  }
}

module.exports = new CartController();
