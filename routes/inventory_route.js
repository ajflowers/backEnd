const router = require('express').Router();
const Inventory = require('../models/inventory_model.js');


router.get('/', (req, res) => {
    const role = req.decodedJwt.role;
    const farm_id = req.decodedJwt.subject;

    if (role === 'farmer') {
        Inventory
            .findBy({farm_id})
            .then(items => {
                res.status(200).json(items)
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
});


router.get('/:id', (req, res) => {
    const farm_id = req.params.id
    const role = req.decodedJwt.role;


    if (role === 'customer') {
        Inventory
            .findBy({farm_id})
            .then(items => {
                res.status(200).json(items)
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
}) 

router.post('/', (req, res) => {
    const newItem = req.body;
    const farm_id = req.decodedJwt.subject;
    const role = req.decodedJwt.role
    if (role === 'farmer') {
        Inventory
            .add({
                ...newItem,
                farm_id
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
    
    if (req.decodedJwt.role === 'farmer') {
        Inventory.update(newInfo, id)
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
    
    if (req.decodedJwt.role === 'farmer') {
        Inventory.remove(id)
            .then(count => {
                res.status(201).json(count);
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
});


module.exports = router;