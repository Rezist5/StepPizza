const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const CartItem = require('./CartItem');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',  
  }
}, {
  timestamps: false,
});


module.exports = Cart;
