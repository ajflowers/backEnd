const router = require('express').Router();
const Farms = require('../models/farmer-users-model.js');

const { validateCustomer } = require('../auth/validate-roles.js');

// GET /api/farms
// for farmers: return own user/farm info
// for customers: return array of farm objects
router.get('/', (req, res) => {
    const role = req.decodedJwt.role;

    if (role === 'farmer') {
        Farms
            .findById(req.decodedJwt.subject)
            .then(farm => {
                res.status(200).json(farm)
            })
            .catch(err => res.status(500).json(err));

    } else if (role === 'customer') {

        Farms
            .find()
            .then(farms => {
                res.status(200).json(farms)
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(401).json({ message: 'Invalid user role.' });
    }
});

// TO DO: return farm info object including array of inventory objects
router.get('/:farmID', validateCustomer, (req, res) => {
    const { farmID } = req.params;

    Farms
        .findById(farmID)
        .then(farm => {
            res.status(200).json(farm)
        })
        .catch(err => res.status(500).json(err));
});

// PUT /api/farms
// update farm info for the logged-in farmer
router.put('/', (req, res) => {
    const farmerID = req.decodedJwt.subject;
    const { farm_name, farm_address } = req.body;
        
    Farms
        .update({ farm_name, farm_address }, farmerID)
        .then(saved => {
            console.log(saved);
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
})



module.exports = router;