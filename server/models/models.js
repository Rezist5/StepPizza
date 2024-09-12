const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Product = require('./Product');
const Combo = require('./Combo');
const ComboProduct = require('./ComboProduct');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Size = require('./Size');

Combo.belongsToMany(Product, { through: ComboProduct, foreignKey: 'comboId' });
Product.belongsToMany(Combo, { through: ComboProduct, foreignKey: 'productId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Size.hasMany(CartItem, { foreignKey: 'sizeId' });
CartItem.belongsTo(Size, { foreignKey: 'sizeId' });

User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Product,
  Combo,
  ComboProduct,
  Cart,
  CartItem,
  Size,
};
