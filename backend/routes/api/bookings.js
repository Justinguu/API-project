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

router.get("/current",requireAuth, async (req, res) => {
  const CurrUserBookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [{ model: Spot }],
  });
  res.json({ CurrUserBookings });
});


// Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const bookingId = req.params.bookingId
  const { startDate, endDate } = req.body
  const newBooking = await Booking.findByPk(bookingId)

  if (startDate > endDate) {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  if (!newBooking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  let now = Date.now()
  let bookingdate = new Date(newBooking.endDate)

  if (now > bookingdate) {
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  const spotId = newBooking.spotId

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [
        {endDate: {[Op.gte]: startDate}},
        {startDate: {[Op.lte]: endDate}},
      ],
    },
  });

  if (currentBookings.length) {
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  if (newBooking.userId === req.user.id) {
    newBooking.startDate = startDate,
    newBooking.endDate = endDate,

    await newBooking.save()
    res.json(newBooking)
  }
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const bookingId = req.params.bookingId
  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
 let now = new Date
  let bookingdate = new Date(booking.startDate)
  if (now > bookingdate) {
    res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  if (booking.userId === req.user.id) {
    booking.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

 
})
module.exports = router;
