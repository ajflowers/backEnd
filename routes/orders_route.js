const router = require('express').Router();
const Customers = require('../helpers/customer_helper.js');

router.get('/', (req, res) => {
    Customers
        .find()
        .then(customers => res.status(200).json(customers))
        .catch(err => res.status(500).json(err));
});

router.get('/:customerID', (req, res) => {
    const { customerID } = req.params;

    Customers
        .findById(customerID)
        .then(customer => res.status(200).json(customer))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    let customerSpecs = {
        ...req.body,
        cusotmerID: req.decodedJwt.subject
    };

    if (req.decodedJwt.role === 'customer') {
        Customers
            .add(cusomerSpecs)
            .then(saved => res.status(201.json(saved)))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You should be logged in as a customer to see this.'})
    }
})