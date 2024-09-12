const { City } = require('../models/City');
class CityController {
    // Получение всех городов
    static async getCities(req, res) {
        try {
            const cities = await City.findAll();
            res.json(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Создание нового города
    static async createCity(req, res) {
        const { name, countryId } = req.body;

        if (!name || !countryId) {
            return res.status(400).json({ message: 'Name and countryId are required' });
        }

        try {
            const newCity = await City.create({ name, countryId });
            res.status(201).json(newCity);
        } catch (error) {
            console.error('Error creating city:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = CityController;
