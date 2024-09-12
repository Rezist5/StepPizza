const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Size = sequelize.define('Size', {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceMultiplier: {
    type: DataTypes.DECIMAL(10, 2),  
    allowNull: false,
    defaultValue: 1.0,  
  },
}, {
  timestamps: false,
});

module.exports = Size;
