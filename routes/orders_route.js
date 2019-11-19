const router = require('express').Router();
const Orders = require('../helpers/orders_helper.js/index.js');

router.get('/:customerID/orders', (req, res) => {
    Orders
        .find()
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(500).json(err));
});

router.get('/:customerID/orders/:orderID', (req, res) => {
    const { orderID } = req.params;

    Orders
        .findById(orderID)
        .then(order => res.status(200).json(order))
        .catch(err => res.status(500).json(err));
});

router.post('/:customerID/orders', (req, res) => {
    let orderSpecs = {
        ...req.body,
        orderID: req.decodedJwt.subject
    };

    if (req.decodedJwt.role === 'customer') {
        Order
            .add(orderSpecs)
            .then(saved => res.status(201).json(saved))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You should be logged in as a customer to see this.'})
    }
});