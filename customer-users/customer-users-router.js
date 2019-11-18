const router = require('express').Router();

const Users = require('./customer-users-model.js');
const restricted = require('../auth/restricted-middleware.js');

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