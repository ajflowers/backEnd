const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customers = require('./customer-users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const { validateUser } = require('./customer-users-helpers.js');

router.post('/register', (req, res) => {
    let user = req.body;
    console.log(user)
    const validateResult = validateUser(user);
    
    if (validateResult.isSuccessful === true) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        
        Customers.add(user)
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
    
    Customers.findBy({ username })
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
        role: "customer" 
    };
    
    const secret = 'secret';
    
    const options = { 
        expiresIn: "1d"
    };
    
    return jwt.sign(payload, secret, options);
}





// router.get('/', restricted, checkRole(["farmer", "customer"]), (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });


// function checkRole(roles) {
//     return function (req, res, next) {
//         if (roles.includes(req.decodedJwt.role)) {
//             if(role)
//             next();
//         } else {
//             res.status(403).json({ message: "You do not have the required credentials to enter here." });
//         }
//     }
// };

router.post('/users/logout', restricted, async (req, res) => {
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