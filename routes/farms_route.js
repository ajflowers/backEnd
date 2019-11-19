const router = require('express').Router();
const Farms = require('../helpers/farms_helper.js');

router.get('/', (req, res) => {
    Farms
        .find()
        .then(farms => {
            res.status(200).json(farms)
        })
        .catch(err => res.status(500).json(err));
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

    console.log(farmSpecs);
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
        res.status(401).json({ message: 'Only farmers can add a new farm' });
    }    
});

module.exports = router;