const Combo = require('../models/Combo');
const Product = require('../models/Product');

class ComboController {
  async createCombo(req, res, next) {
    try {
      const { name, discount, description, productIds } = req.body;

      const combo = await Combo.create({ name, discount, description });

      const products = await Product.findAll({
        where: {
          id: productIds,
        },
      });

      if (products.length !== productIds.length) {
        return next(ApiError.badRequest('Some products not found'));
      }

      await combo.addProducts(products);

      return res.json(combo);
    } catch (error) {
      console.error('Error creating combo:', error);
      return next(ApiError.badRequest('Failed to create combo'));
    }
}


  async getCombo(req, res) {
    try {
      const { id } = req.params;
      const combo = await Combo.findByPk(id, {
        include: Product,
      });

      if (!combo) {
        return next(ApiError.badRequest('Combo not found'));
        
      }

      return res.json(combo);
    } catch (error) {
      console.error('Error retrieving combo:', error);
      return next(ApiError.badRequest('Failed to retrieve combo'));
      
    }
  }

  async getCombos(req, res) {
    try {
      const combos = await Combo.findAll({
        include: Product,
      });

      return res.json(combos);
    } catch (error) {
      console.error('Error retrieving combos:', error);
      return next(ApiError.badRequest('Failed to retrieve combos'));
      
    }
  }

  async deleteCombo(req, res) {
    try {
      const { id } = req.params;
      const combo = await Combo.findByPk(id);

      if (!combo) {
        return next(ApiError.badRequest('Combo not found'));
      }

      await combo.destroy();

      return res.status(204).send();  
    } catch (error) {
      console.error('Error deleting combo:', error);
      return next(ApiError.badRequest('Failed to delete combo'));
      
    }
  }
}

module.exports = new ComboController();
