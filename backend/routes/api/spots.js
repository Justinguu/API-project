const express = require('express')
const {setTokenCookie } = require('../../utils/auth')
const { Spot, Review ,Image, sequelize } = require('../../db/models')
const router = express.Router();

//get all spots
router.get('/', async(req,res) => {
const getAllSpots = await Spot.findAll({
    attributes: [
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price'
       
    ]
})
res.status(200)
return res.json({getAllSpots})
})

//get spots owned by current user
router.get('/', async (req, res) => {

    const spots = await Spot.findAll(req.params.id, {
        include: [
            {
            
            },
        ]
    });
    res.json({spots});
});








module.exports = router;