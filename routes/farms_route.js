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

router.put('/:id', (req, res) => {
    const farmID = req.params.id;
    const newInfo = req.body;
    console.log(`PUT /farms/${farmID}`, newInfo);
    
    if (req.decodedJwt.role === 'farmer') {
        Farms
            .update(newInfo, farmID)
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