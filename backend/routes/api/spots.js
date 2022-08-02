const express = require('express')
const {setTokenCookie, restoreUser } = require('../../utils/auth')
const { Spot } = require('../../db/models')
const router = express.Router();

//get all spots
router.get('/', async(req,res) => {
const getAllSpots = await Spot.findAll({
})
return res.json(getAllSpots)
})






module.exports = router;