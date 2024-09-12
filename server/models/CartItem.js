const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const Size = require('./Size');
const Cart = require('./Cart');

const CartItem = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Size,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  
    allowNull: false,
  },
}, {
  timestamps: false,
});

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

module.exports = CartItem;
