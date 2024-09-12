const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

const Combo = sequelize.define('Combo', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL(5, 2),  
    allowNull: false,
    defaultValue: 1.00,  
    validate: {
      min: 0.0,
      max: 1.0,  
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,

  getterMethods: {
    async totalPrice() {
      const products = await this.getProducts();  
      const totalPriceWithoutDiscount = products.reduce((total, product) => total + parseFloat(product.price), 0);  
      const totalPriceWithDiscount = totalPriceWithoutDiscount * this.discount;  
      return totalPriceWithDiscount.toFixed(2);  
    }
  }
});

module.exports = Combo;
