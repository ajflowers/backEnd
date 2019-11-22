const router = require('express').Router();
const Inventory = require('../models/inventory_model.js');

const {validateCustomer, validateFarmer} = require('../auth/validate-roles.js');


router.get('/', validateFarmer, (req, res) => {
    const role = req.decodedJwt.role;
    const farm_id = req.decodedJwt.subject;

    Inventory
    .findBy({farm_id})
    .then(items => {
        res.status(200).json(items)
    })
    .catch(err => res.status(500).json(err));

});


router.get('/:id', validateCustomer, (req, res) => {
    const farm_id = req.params.id
    const role = req.decodedJwt.role;

    Inventory
        .findBy({farm_id})
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => res.status(500).json(err));
}) 

router.post('/', validateFarmer, (req, res) => {
    const newItem = req.body;
    const farm_id = req.decodedJwt.subject;
    
    Inventory
        .add({
            ...newItem,
            farm_id
        })
        .then(added => {
            res.status(201).json(added);
        })
        .catch(err => res.status(500).json(err));
});

router.put('/:id', validateFarmer, (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;
    
    Inventory.update(newInfo, id)
        .then(updated => {
            res.status(201).json(updated);
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', validateFarmer, (req, res) => {
    const id = req.params.id;
    
    Inventory.remove(id)
        .then(count => {
            res.status(201).json(count);
        })
        .catch(err => res.status(500).json(err));
});


module.exports = router;