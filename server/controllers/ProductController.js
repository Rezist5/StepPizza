const Product = require('../models/Product');
const Combo = require('../models/Combo');
const ApiError = require('../error/ApiError');


class ProductController {
    async getProduct(req, res) {
        try {
            const { id } = req.params;  
            const product = await Product.findByPk(id);  
    
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
                
            }
    
            return res.json(product);  
        } catch (error) {
            console.error('Error retrieving product:', error);
            return next(ApiError.badRequest('Failed to retrieve product'));
            
        }
    }
    
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();  
            return res.json(products);  
        } catch (error) {
            console.error('Error retrieving products:', error);
            return next(ApiError.badRequest('Failed to retrieve products'));
            
        }
    }
    
    async createProduct(req, res) {
        try {
          const { name, price, type, info, size, mass } = req.body;
          let fileName = null;
    
          if (req.files && req.files.image) {
            const { image } = req.files;
            fileName = uuid.v4() + path.extname(image.name);  
            const imagePath = path.resolve(__dirname, '..', 'static', fileName);
            image.mv(imagePath); 
          }
    
          const product = await Product.create({
            name,
            price,
            type,
            info,
            size,
            mass,
            image: fileName ? `/static/${fileName}` : null,  
          });
    
          return res.json(product);  
        } catch (error) {
          console.error('Error creating product:', error);
          return next(ApiError.badRequest('Failed to create product'));
          
        }
      }
    
}

module.exports = new ProductController();
