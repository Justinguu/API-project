const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  Image,
  sequelize,
  User,
  Booking,
} = require("../../db/models");
const { raw } = require("express");
const { check } = require("express-validator");
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
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params
  const { startDate, endDate } = req.body

  const editBooking = await Booking.findByPk(bookingId)

  const allBookings = await Booking.findAll({
      attributes: ['startDate', 'endDate']
  })

  // if (editBooking) {
  //     let booked;
  //     for (let booking of allBookings) {
  //         if (booking.startDate === editBooking.startDate) {
  //             booked = true
  //         }
  //     }
  //     if (booked) {
  //         res.json({
  //             message: "Sorry, this spot is already booked for the specified dates",
  //             statusCode: 403,
  //             errors: {
  //                 startDate: "Start date conflicts with an existing booking",
  //                 endDate: "End date conflicts with an existing booking"
  //             }
  //         })
  //     } else if (endDate < startDate) {
  //         res.status(400)
  //         res.json({
  //             message: "Validation error",
  //             statusCode: 400,
  //             errors: {
  //                 endDate: "endDate cannot come before startDate"
  //             }
  //         })
  //     } else if (endDate < new Date()) {
  //         res.json({
  //             message: "Past bookings can't be modified",
  //             statusCode: 403
  //         })
  //     } else {
  //         editBooking.set({ startDate, endDate });
  //         await editBooking.save()
  //         res.json(editBooking)
  //     }
  // } else {
  //     res.json({
  //         "message": "Booking couldn't be found",
  //         "statusCode": 404
  //     })
  // }
  editBooking.set({ startDate, endDate });
  await editBooking.save()
  res.json(editBooking)
})


// router.put('/:bookingId',requireAuth, async(req, res) => {
//   const { bookingId } = req.params

//   const { startDate, endDate } = req.body

//   const editBookings = await Booking.findByPk(bookingId)

//   const getAllBookings= await Booking.findAll({
//   })

//   if(editBookings === getAllBookings){
//     res.status(403)
//     return res.json({
//       message: "Sorry, this spot is already booked for the specified dates",
//       statusCode: 403,
//       errors: {
//         startDate: "Start date conflicts with an existing booking",
//         endDate: "End date conflicts with an existing booking",
//       },
//     });
//   }
//   if(endDate < startDate){
//       res.status(400)
//       return res.json({
//         message: "Validation error",
//         statusCode: 400,
//         errors: {
//           endDate: "endDate cannot come before startDate",
//         },
//       });
//   } 
//   if(endDate < new Date()){
//       res.status(403)
//        return res.json({
//         message: "Past bookings can't be modified",
//         statusCode: 403,
//       });
//   }
//   if(editBookings){
//       editBookings.set({
//           startDate,
//           endDate
//       })
//       await editBookings.save()
//        return res.json(editBookings)
//   }else {
//     res.status(404)
//     return res.json({
//       message: "Booking couldn't be found",
//       statusCode: 404,
//     });
//   }
// })


// });
//Delete a booking

router.delete("/:bookingId", requireAuth,async (req, res) => {
  const { bookingId } = req.params;
  const currentBooking = await Booking.findByPk(bookingId);

  if (!currentBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  await currentBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
  
});

module.exports = router;
