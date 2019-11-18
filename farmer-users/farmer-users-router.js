const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Farmers = require('./farmer-users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const { validateUser } = require('../customer-users/customer-users-helpers.js');


router.get('/', restricted, checkRole(["farmer", "customer"]), (req, res) => {
  Farmers.find()
    .then(farmers => {
      res.json(farmers);
    })
    .catch(err => res.send(err));
});


function checkRole(roles) {
    return function (req, res, next) {
        if (roles.includes(req.decodedJwt.role)) {
            next();
        } else {
            res.status(403).json({ message: "You do not have the required credentials to enter here." });
        }
    }
};


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
        // console.log("USER>>>", user)
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
    
    const secret = 'secret';
    
    const options = { 
        expiresIn: "1d"
    };
    
    return jwt.sign(payload, secret, options);
}

router.post('/farmers/logout', restricted, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;