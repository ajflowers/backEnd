const db = require('../data/dbConfig.js');

modules.exports = {
    validateStock
}

const validateStock = async (req, res, next) => {
    const items = req.body.items_ordered;

    
}