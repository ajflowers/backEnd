const router = require('express').Router();
const Orders = require('../models/orders-model.js');


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

router.post('/', (req, res) => {
    const newItem = req.body;
    const customer_id = req.decodedJwt.subject;
    const role = req.decodedJwt.role;

    if (role === 'customer') {
        Orders
            .add({
                ...newItem,
                customer_id
            })
            .then(added => {
                res.status(201).json(added);
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
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