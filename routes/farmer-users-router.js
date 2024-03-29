const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmers = require('../models/farmer-users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const { validateUser } = require('../auth/users-helpers.js');


router.post('/register', (req, res) => {
    let user = req.body;
    console.log(user)
    const validateResult = validateUser(user);
    
    if (validateResult.isSuccessful === true) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        
        Farmers.add(user)
        .then(saved => {
            console.log(saved);
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } else {
        res.status(400).json({
            message: "Invalid information about the user, see errors for details",
            errors: validateResult.errors
        });
    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Farmers.findBy({ username })
    .first()
    .then(user => {
        console.log("USER>>>", user)
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            console.log("TOKEN///", token)
            res.status(200).json({
                message: `Welcome ${user.username}! Have a token...`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json("this is an error");
    });
});

function generateToken(user) {
    
    const payload = {
        subject: user.id,
        username: user.username,
        role: "farmer" 
    };
    
    const secret = process.env.JWT_SECRET || "is it secret? is it safe?";
    
    const options = { 
        expiresIn: "1d"
    };
    
    return jwt.sign(payload, secret, options);
}


module.exports = router;