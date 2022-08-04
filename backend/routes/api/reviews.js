const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const router = express.Router();



router.get("/current", async (req, res) => {
    //using file path of /current bc spot is already implied
    //   console.log(req.user);
    const userId = req.user.dataValues.id;
    const allReviewsByCurr = await Spot.findAll({
      include: [{ model: User, where: { id: userId } }],
    });
    res.json({ allReviewsByCurr });
  });
  


module.exports = router;