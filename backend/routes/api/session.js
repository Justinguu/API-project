// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');  // USER LOGIN API ROUTE
const { User } = require('../../db/models');
const { check } = require('express-validator'); //line 5 & 6 checking validation login request body
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// backend/routes/api/session.js

const validateLogin = [  //  will expect the body of the request to have a key of credential
//  with either the username or email of a user and a key of password with the password of the user.
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'), 
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in   
// if there is a user returned from login then call setToken Cookie and return JSON response else return login failed
// It checks to see whether or not req.body.credential and req.body.password are empty. 
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);



// User Logout API route
// will remove the token cookie from the response & return json message
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get("/", requireAuth, async (req, res) => {
  res.json(req.user)
});


module.exports = router;