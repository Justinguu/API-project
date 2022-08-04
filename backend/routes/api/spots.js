const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  Image,
  sequelize,
  User,
  Booking,
} = require("../../db/models");
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
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body; //destructure the body
  //console.log(req.user)
  let userId = req.user.dataValues.id; //key into req.user.datavalues to pull out id
  let createSpot = await Spot.create({
    ownerId: userId, //want the ownerId to show the userId and following attributes
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
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body; // { review: 'This was an awesome spot!', star: undefined }
    const { user } = req   //
    // console.log(user)
    // User {
    //   dataValues: {
    //     id: 4,
    //     firstName: 'John',
    //     lastName: 'Smith',
    //     username: 'johnnysmith',
    //     email: 'john.smith@gmail.com'
    //   },
    const userId = user.dataValues.id //Id of current logged in user
  
    const spotId = req.params.spotId //spotId: '4'
    const spot = await Spot.findByPk(spotId)
  
    //* Error response: Review from the current user already exists
    //for the Spot
    const allReviews = await Review.findAll({
      include: [{
        model: Spot,
        where: {
          id: spotId
        }
      }
      ]
    })
  
    //* Error response: Review from the current user already exists for the Spot
    if (spot) {
      let reviewed;
      for (let reviews of allReviews) {
        if (reviews.userId === userId) {
          reviewed = true
        }
      }
      if (reviewed) {
        res.status(403)
        res.json({
          message: "User already has a review for this spot",
          statusCode: 403
        })
      }
  
      // //* Error Response: Body validation errors - COMPLETE
      //console.log(stars) //0
      else if (stars < 1 || stars > 5) {
        res.status(400)
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            review: "Review text is required",
            stars: "Stars must be an integer from 1 to 5",
          }
        })
      }
  
      //Create Review
      else {
        const spotReview = await Review.create({
          userId, spotId, review, stars
        })
        res.json(spotReview)
      }
  
    }
    //* Error response: Couldn't find a Spot with the specified id - COMPLETE
    else {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
  
  }
  
  })
  


// Get all Reviews of the Current User
router.get("/current", async (req, res) => {
  let userId = req.user.dataValues.id;

  const allReviews = await Review.findAll({
    include: [
      { model: User, where: { id: userId } },
      { model: Spot },
      { model: Image },
    ],
  });
  if (allReviews) {
    res.status(200);
    res.json({ allReviews });
  }
});

//get Reviews by Spot Id

router.get("/:spotId/reviews", async (req, res) => {
  const { review, stars } = req.body;
  const { spotId } = req.params;
  const currentSpot = await Spot.findByPk(spotId);

  if (currentSpot) {
    const reviews = await Review.findAll({
      include: [{ model: Review, where: { id: spotId } }],
    });
  }
});

//Delete a Spot

router.delete("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const currentSpot = await Spot.findByPk(spotId);

  if (!currentSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    await currentSpot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
