// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser); // no matter where the route is. middleware is applied

router.use('/session', sessionRouter);   //sessionRouter and userRouter already defined here so can just use "/"

router.use('/users', usersRouter);  // users

router.use('/spots', spotsRouter)  // spots

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
