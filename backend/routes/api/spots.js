const express = require("express");
const { Spot, Review, Image, sequelize, User } = require("../../db/models");
const router = express.Router();

//get all spots
router.get("/", async (req, res) => {
  const getAllSpots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: Image,
        attributes: ["previewImage"],
      },
    ],
  });
  return res.json({ getAllSpots });
});

//get spots owned by current user
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
// router.get("/:spotId", async (req, res) => {
//   const spot = await Spot.findByOne({
//     attributes: {},
//     include: [
//       {
//         model: Review,
//         attributes: [],
//       },
//     ],
//   });
//   res.json(spot);
// });

router.post("/", async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body;
  //console.log(req.user)
  let userId = req.user.dataValues.id;
  let newSpot = await Spot.create({
    ownerId: userId,
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
  res.json(newSpot);
});

router.put("/:spotId", async (req, res) => {
    console.log(req)
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
    res.json({ message: "Spot couldn't be found", statusCode: 404 });
  }
});

module.exports = router;
