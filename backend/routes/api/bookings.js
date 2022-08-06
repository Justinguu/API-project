const express = require("express");
const { requireAuth, restoreUser } = require("../../utils/auth");
const {
  Spot,
  Review,
  Image,
  sequelize,
  User,
  Booking,
} = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

//get current bookings

router.get("/current",requireAuth, restoreUser, async (req, res) => {
  const CurrUserBookings = await Booking.findAll({  //finding all
    where: {
      userId: req.user.id,   //console.log( req.user)
    },
    include: [{ model: Spot }],  //include the model
  });
  res.json({ CurrUserBookings });
});


// Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const bookingId = req.params.bookingId    //pull out params
  const { startDate, endDate } = req.body   // required material
  const editBooking = await Booking.findByPk(bookingId)   //find by id

  if (startDate > endDate) {    //if start date is greater than end date throw err
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  if (!editBooking) {     // if not found throw err
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  let now = Date.now()     // date.now()  returns the number of milliseconds elapsed since January 1
  let bookingdate = new Date(editBooking.endDate)  // new Date key into the newbooking to get endDate

  if (now > bookingdate) {     // if greater than booking date
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  const spotId = editBooking.spotId

  const currBookings = await Booking.findAll({
    where: {
      spotId: spotId,    //spotId = spotid
      [Op.and]: [      //endDate and startDate
        {endDate: {[Op.gte]: startDate}},  //greater than equal to startDate
        {startDate: {[Op.lte]: endDate}},  // less than equal to endDate
      ],
    },
  });

  if (currBookings.length) {  //if bookings is the same then throw this error
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  if (editBooking.userId === req.user.id) {      //if booking userId is equaled to user.id
    editBooking.startDate = startDate,
    editBooking.endDate = endDate,

    await editBooking.save()
    res.json(editBooking)
  }
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const bookingId = req.params.bookingId
  const deleteBooking = await Booking.findByPk(bookingId)

  if (!deleteBooking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
 let now = Date.now()   // date.now()  returns the number of milliseconds elapsed since January 1
  let bookDate = new Date(deleteBooking.startDate)
  if (now > bookDate) {       //if after the bookDate then cant be deleted
    res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  if (deleteBooking.userId === req.user.id) {
    deleteBooking.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

 
})
module.exports = router;
