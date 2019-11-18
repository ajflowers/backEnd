const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Users = require('../users/users-model.js');
const { validateUser } = require('../users/users-helpers.js');
const secrets = require('../config/secrets.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user)
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(saved => {
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

  Users.findBy({ username })
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
    role: "student" //probably come from db
  };


  const options = { 
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/logout', function(req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if(err) {
        return res.redirect('/');
      } else {
        res.clearCookie(user);
        res.redirect('/login');
      }
    });
  }
});




module.exports = router;
