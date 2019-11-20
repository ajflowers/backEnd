const router = require('express').Router();
const Farms = require('../models/farmer-users-model.js');

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

router.get('/:farmID', (req, res) => {
    const { farmID } = req.params;

    Farms
        .findById(farmID)
        .then(farm => {
            res.status(200).json(farm)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    let farmSpecs = {
        ...req.body,
        farmerID: req.decodedJwt.subject
    };

    if (req.decodedJwt.role === 'farmer') {
        Farms
            .add(farmSpecs)
            .then(saved => {
                console.log(saved);
                res.status(201).json(saved);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }    
});

router.put('/', (req, res) => {
    const farmerID = req.decodedJwt.subject;
    const newInfo = req.body;
    console.log(`PUT /farms/${farmerID}`, newInfo);
    
    if (req.decodedJwt.role === 'farmer') {
        Farms
            .update(newInfo, farmerID)
            .then(saved => {
                console.log(saved);
                res.status(201).json(saved);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
})



module.exports = router;