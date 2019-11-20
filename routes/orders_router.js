const router = require('express').Router();
const Orders = require('../models/orders-model.js');
const OrderDetails = require('../models/order-details-model.js');


const {validateCustomer, validateFarmer} = require('../auth/validate-roles.js');



router.get('/', (req, res) => {
    const role = req.decodedJwt.role;
    const farm_id = req.decodedJwt.subject;

    if (role === 'farmer') {
        Orders
            .findBy({ farm_id })
            .then(items => {
                res.status(200).json(items)
            })
            .catch(err => res.status(500).json(err));

    } else if (role === 'customer') {
        Orders
            .findBy({ customer_id })
            .then(orders => res.status(200).json(orders))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
});


router.get('/:id', (req, res) => {
    const order_id = req.params.id;

    if (order_id) {
        Orders
            .findBy({order_id})
            .then(order => {
                res.status(200).json(order)
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
}) 

router.post('/', validateCustomer, async (req, res) => {
    const {farm_id, customer_name, customer_email, items_ordered} = req.body;
    const customer_id = req.decodedJwt.subject;
    const now = new Date();
    const order_date = now.toISOString();

    if (!items_ordered || items_ordered.length === 0) {
        res.status(400).json({ message: 'You must select at least one item to place an order' });
    } else {
        try{
            const newOrder = await Orders.add({
                customer_id,
                farm_id,
                customer_name,
                customer_email,
                order_date 
            });

            const newDetails = await Promise.all(items_ordered.map(async item => 
                await OrderDetails.add({
                    order_id: newOrder.id,
                    item: item.item, //oh god did I really type this line
                    quantity: item.quantity
                })
            ));

            res.status(201).json({
                ...newOrder,
                items_ordered: newDetails
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }  

});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;
    
    if (req.decodedJwt.role === 'customer') {
        Orders
            .update(newInfo, id)
            .then(updated => {
                res.status(201).json(updated);
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    if (req.decodedJwt.role === 'customer') {
        Orders
            .remove(id)
            .then(count => {
                res.status(201).json(count);
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
});


module.exports = router;