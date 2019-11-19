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

router.post('/:farmer', (req, res) => {
    const { farmID } = req.params;

    let farmSpecs = req.body;
    Farms
        .
})