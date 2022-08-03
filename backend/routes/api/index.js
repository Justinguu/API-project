// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');  //import spots
const usersRouter = require('./users.js'); // import users
const reviewsRouter = require('./reviews.js'); // import reviews
const bookingsRouter = require('./bookings.js') // import bookings
const { restoreUser } = require("../../utils/auth.js");   //restoreUser

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser); // no matter where the route is. middleware is applied //references line 7

router.use('/session', sessionRouter);   //sessionRouter and userRouter already defined here so can just use "/"

router.use('/users', usersRouter);  // users references line 5

router.use('/spots', spotsRouter);  // spots references line 4

router.use('/reviews', reviewsRouter); //reviews references line 6  //almost forgot to add module.exports. dont forget

router.use('/bookings', bookingsRouter); 

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
