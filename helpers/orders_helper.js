const db = require('../data/dbConfig.js');



const validateStock = async (req, res, next) => {
    const items = req.body.items_ordered;
    // console.log('items ordered', items);

    const itemsInStock = await Promise.all(items.map(item => {
        db('inventory')
            .where('id', '=', item.inventory_id)
            .select()
            .then(inv => {
                console.log(inv, item);
                if ( parseInt(inv.quantity) >= item.quantity) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => err);
    }))
    console.log(itemsInStock);

    if (itemsInStock.includes(false)) {
        res.status(400).json({ message: 'Insufficient inventory to fill order'})
    } else {
        next();
    }

    
}


module.exports = {
    validateStock
}
