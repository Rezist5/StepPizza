const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ComboProduct = sequelize.define('ComboProduct', {
  comboId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Combos', 
      key: 'id',
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', 
      key: 'id',
    }
  },
}, {
  timestamps: false,
});

module.exports = ComboProduct;
