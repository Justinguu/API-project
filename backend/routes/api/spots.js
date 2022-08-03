const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const router = express.Router();

//GET ALL SPOTS
router.get("/", async (req, res) => {
  //   const getAllSpots = await Spot.findAll({
  //     attributes: {
  //       include: [
  //         [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
  //       ],
  //     },
  //     include: [
  //       {
  //         model: Review,
  //         attributes: [],
  //       },
  //       {
  //         model: Image,
  //         attributes: ["previewImage"],
  //       },
  //     ],
  //   });
  // console.log(req)
  const getAllSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: ["review"],
      },
      {
        model: Image,
        attributes: ["previewImage"],
      },
    ],
  });
  return res.json({ getAllSpots });
});

//GET SPOTS BY CURRENT USER

router.get("/current", async (req, res) => {
  //using file path of /current bc spot is already implied
  //   console.log(req.user);
  const userId = req.user.dataValues.id;
  const CurrUserSpots = await Spot.findAll({
    include: [{ model: User, where: { id: userId } }],
  });
  res.json({ CurrUserSpots });
});

// GET details of a Spot from an id

router.get("/:spotId", async (req, res) => {
  let spotId = req.params.spotId;
  const spotIdDetails = await Spot.findByPk(spotId, {
    include: [
      {
        model: Image,
        attributes: ["id", "url"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (spotIdDetails) {
    res.json({ spotIdDetails });
  } else {
    res.status(404);
    res.json({
      statusCode: 404,
      message: "Spot couldn't be found",
    });
  }
  res.json(spotIdDetails);
});

//CREATE A SPOT

router.post("/", async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body; //destructure the body
  //console.log(req.user)
  let userId = req.user.dataValues.id; //key into req.user.datavalues to pull out id
  let createSpot = await Spot.create({
    ownerId: userId,  //want the ownerId to show the userId and following attributes
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  if (createSpot) {
    res.json(createSpot);
  } else {
    res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }
  res.json(newSpot);
});

//EDIT A SPOT

router.put("/:spotId", async (req, res) => {
  console.log(req);
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const editSpot = await Spot.findByPk(spotId);

  if (editSpot) {
    editSpot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await editSpot.save();
    res.json(editSpot);
  } else {
    res.status(400); //EDIT A SPOT ERROR CHECK
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }
});

module.exports = router;
