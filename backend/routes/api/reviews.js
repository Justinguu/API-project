const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const router = express.Router();




module.exports = router;