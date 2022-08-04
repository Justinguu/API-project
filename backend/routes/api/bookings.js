const express = require("express");
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const { raw } = require('express');
const { check } = require('express-validator');
const router = express.Router();


//get current bookings

router.get("/current", async (req, res) => {

  const CurrUserBookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {model: Spot}
    ]
  });
 return  res.json({ CurrUserBookings });
});





module.exports = router;