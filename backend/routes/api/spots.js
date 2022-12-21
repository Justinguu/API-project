const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser} = require('../../utils/auth')
const {Booking, Image, Review, Spot, User, sequelize} = require('../../db/models');


// // //GET ALL SPOTS
// //Part 1
// router.get('/', async (req, res, next) => {
//   const allSpots = await Spot.findAll({
//     attributes: {
//       include: [
//            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
//       ]
//     },
//     include:  [     //Provide access to Review model from associations
//       {model: Review, attributes: []}
//     ],
//     group: ['Spot.id'], //
//     raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
//   })

//   //Part 2 - Associate previewImage with Spots
//   //Iterate through each spot in allSpots variable
//   for (let spot of allSpots){
//     const image = await Image.findOne({
//       attributes: ['url'],
//       where: {
//         previewImage: true,
//         spotId: spot.id
//       },
//       raw:true
//     })

//     //Determine if image contains a url link
//    if(image){ //if image exists, set the url of the image equal to the value of previewImage
//       spot.previewImage = image.url  //www.allstar1.com'
//     } else {
//       spot.previewImage = null
//     }
//   }

//   res.status(200)
//   res.json({ allSpots })
// })


//GET ALL SPOTS OWNED BY CURRENT USER

router.get('/current', requireAuth,restoreUser, async (req, res) => {
  let userId = req.user.dataValues.id

  const allSpots = await Spot.findAll({
      attributes: {
          include: [
              [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],

          ]
      },
      include: [
          { model: User, where: { id: userId }, as: 'Owner', attributes: []},
          { model: Review, attributes: []}
      ],
      group: ['Spot.id'],
      raw: true
  })
  for (let spot of allSpots) {
      const image = await Image.findOne({
          attributes: ['url'],
          where: {
              previewImage: true,
              spotId: spot.id
          },
          raw: true
      })

      //Determine if image contains a url link
      if (image) { // if image exists, set the url of the image equal to the value of previewImage
          spot.previewImage = image.url
      } else {
          spot.previewImage = null
      }
  }
  res.status(200)
  res.json({ allSpots })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const reviewss = await Review.count({
    where: { spotId: spotId }
  })

  const avgRating = await Review.findOne({
    attributes: [[ sequelize.fn("avg", sequelize.col('stars')), "avgStarRating" ]],
    where: { spotId: spotId },
    raw: true
  })

  const images = await Image.findAll({
    attributes: [ 'id', ['spotId', 'imageableId'], 'url' ],
    where: { spotId: spotId }
  })

  const owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })

  const ans = spot.toJSON()

  ans.reviewss = reviewss
  ans.avgStarRating = avgRating.avgStarRating
  ans.Images = images
  ans.Owner = owner

  res.json(ans)
})


//CREATE A SPOT

router.post("/", requireAuth, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description,type, price } =
    req.body; //destructure the body
  //console.log(req.user)
  let userId = req.user.dataValues.id; 
  let createSpot = await Spot.create({
    ownerId: userId, //want the ownerId to show the userId and following attributes
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    type,
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
  // res.json(createSpot);  // commented out bc of bill
});


//### Add an Image to a Spot based on the Spot's id - COMPLETE
router.post('/:spotId/images', restoreUser, async (req, res, next) => {

  // DECONSTRUCT SPOT ID
  const spotId = req.params = req.params.spotId;

  //DECONSTRUCT USER, URL & PREVIEW IMAGE
  const { user } = req
  const { url, previewImage } = req.body

  
  //IF USER DOESN'T EXIST - THROW ERROR
  if (!user) return res.status(401).json({ "message": "You need to be logged in to make any changes", "statusCode": 401 })


  //CONFIRM IF SPOT ID EXISTS
  const spot = await Spot.findByPk(spotId)


  //THROW ERROR IF SPOT COULD NOT BE FOUND
  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  console.log('are we reaching it?')
  const image = await Image.create({ url, previewImage, spotId, userId: user.id})
  console.log("images that we get",image )
  //DEFINE AN OBJECT IN ORDER TO MAKE THE ASSOCIATION
  const obj = {}
  obj.id = image.id
  obj.imageableId = parseInt(spotId)
  obj.url = image.url

  res.status(200).json(obj)

})

//EDIT A SPOT

router.put("/:spotId", requireAuth,restoreUser, async (req, res) => {
  console.log(req);
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description,type, price, url } =
    req.body;

  const editTheSpot = await Spot.findByPk(spotId);

  if (editTheSpot) {
    editTheSpot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      type,
      price,
      url
     
    });
    await editTheSpot.save();
    res.json(editTheSpot);
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
        url: "url is required"
      
      },
    });
  }
});
//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews',requireAuth, restoreUser,async (req, res) => {
    const { review, stars } = req.body; // { review: 'This was an awesome spot!', star: undefined }
    const { user } = req   // destructering user to be able to use id

    const userId = user.dataValues.id //Id of current logged in user
  
    const spotId = req.params.spotId //spotId: '4'
    const spot = await Spot.findByPk(spotId)
  
  
    const allReviews = await Review.findAll({
      include: [{
        model: Spot,
        where: {
          id: spotId  //grabbing spot id from model of spot
        }
      }
      ]
    })
  
    //* Error response: Review from the current user already exists for the Spot
    if (spot) {
      let reviewed;
      for (let review of allReviews) {       //check review if it already exists
        if (review.userId === userId) {
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
      else {
        const spotReview = await Review.create({     //finally create review
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
  const { spotId } = req.params; // = req.params.spotId
  const currSpot = await Spot.findByPk(spotId);
    const spotReviews = await Review.findAll({
    where: {
        spotId
    },include: [
        {model: User, attributes: ['id','firstName', 'lastName']},
        {model: Image}
     ]
    
    })
   if(currSpot){
    res.status(200)
    return res.json(spotReviews)
       } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
          });
       }
 
});



// Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  let { spotId } = req.params
  const currentUserId = req.user.id
  const findSpot = await Spot.findByPk(spotId)

  const owner = await Spot.findOne({
      where: {id: spotId}
  })

  const allBookings = await Booking.findAll({
      where: { spotId },
      include: [
          { model: User, attributes: ['id', 'firstName', 'lastName'] },
      ]
  })

  if (findSpot) {
      if (owner.id === currentUserId) {
          res.status(200)
          res.json({ allBookings })
      } else {
          const allBookings = await Booking.findAll({
              where: { spotId },
              attributes: ['spotId', 'startDate', 'endDate']
          })
          res.status(200)
          res.json({ allBookings })
      }
  } else {
      res.status(404)
      res.json({
          message: "Spot couldn't be found",
          statusCode: 404,
      })
  }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings',requireAuth,restoreUser, async (req, res) => {
  const { startDate, endDate } = req.body

  const { spotId } = req.params
  const findSpot = await Spot.findByPk(spotId)

  const { user } = req
  const userId = user.dataValues.id

  const allBoookings = await Booking.findAll({   
      include: [
          { model: Spot, where: { id: spotId } }
      ]
  })

  if (findSpot) {
      //* Error response: Review from the current user already exists for the Spot
      let booked;
      for (let booking of allBoookings) {
          if (booking.userId === userId) {
              booked = true
          }
      }
      if (booked) {
          res.status(403)
          res.json({
              message: "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
              }
            })
      } else if (endDate < startDate) {  //* Error Response: Body validation errors
          res.status(400)
          res.json({
              message: "Validation error",
              statusCode: 400,
              errors: {
                "endDate": "endDate cannot be on or before startDate"
              }
            })
      } else {
          // Create Review
          const spotBooking = await Booking.create({
              spotId, userId, startDate, endDate
          })
          res.json(spotBooking)
      }
  } else {
      //* Error response: Couldn't find a Spot with the specified id
      res.status(404)
      res.json({
          message: "Spot couldn't be found",
          statusCode: 404
      })
  }
})



//Delete a Spot

router.delete("/:spotId",requireAuth,restoreUser, async (req, res) => {
  const { spotId } = req.params;
  const destorySpot = await Spot.findByPk(spotId);


  if (!destorySpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  await destorySpot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
  
});


          
// query for spots  + GET ALL SPOTS

// Return spots filtered by query parameters.
router.get('/', async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query //destructering

  let where = {};  // putting into object

  if (minLat) {                    //if destructured exists were going to assign them to key value pair.
      where.minLat = minLat
  }
  if (maxLat) {
      where.maxLat = maxLat
  }
  if (minLng) {
      where.minLng = minLng
  }
  if (maxLng) {
      where.maxLng = maxLng
  }
  if (minPrice) {
      where.minPrice = minPrice
  }
  if (maxPrice) {
      where.maxPrice = maxPrice
  }

  page = parseInt(page); // turning it into an intger
  size = parseInt(size);

  if (Number.isNaN(page) || !page) page = 1;  //if it doesnt exist  or not a number gonna default gonna become page 1 or 2
  if (Number.isNaN(size) || !size) size = 20;

  if ((page < 1 || page > 10) || (size < 1 || size > 20)) {      //the constraints they gave us and itll throw an error
      res.status(400)
      res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
              page: "Page must be greater than or equal to 1",
              size: "Size must be greater than or equal to 1"
          }
      })
  }

  if (req.query.page && req.query.size) {  // accessing req to pull out req and size 
      
      const allSpots = await Spot.findAll({   // finding all our spots
          where: { ...where },     // spreading our destructuring
          group: ['Spot.id'],
          raw: true, //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
          limit: size,
          offset: size * (page - 1),   // doing pagination
      })

      //Part 2 - Associate previewImage with Spots
      //Iterate through each spot in allSpots variable
      for (let spot of allSpots) {                //itteating through our spot to find our image
          const image = await Image.findOne({
              attributes: ['url'],
              where: {
                  previewImage: true,     
                  spotId: spot.id
              },
              raw: true
          })

          //Determine if image contains a url link
          if (image) { // if image exists, set the url of the image equal to the value of previewImage
              spot.previewImage = image.url
          } else {
              spot.previewImage = null
          }
      }

      res.json({
          allSpots,    // include print page and size
          page,
          size
      });

  } else {

      // GET ALL SPOTS EXCLUDING PAGINATION

      const allSpots = await Spot.findAll({
          attributes: {
              include: [
                  [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
              ]
          },
          include: [     //Provide access to Review model from associations
              { model: Review, attributes: [] }   // empty to not show review attributes.
          ],
          group: ['Spot.id'],   // needed in order to return all spots, was causing errors without it,    only returns first spot, almost like a push concept to show us all 
          raw: true //method to convert out from findByPk && findOne into raw data aka JS object... console.log(raw:true) excludes unneeded data to show what is needed from allSpots
         
      })
              console.log(allSpots)
      //Part 2 - Associate previewImage with Spots
      //Iterate through each spot in allSpots variable
      for (let spot of allSpots) {             //adding preview image
          const image = await Image.findOne({
              attributes: ['url'],
              where: {
                  previewImage: true,
                  spotId: spot.id
              },
              raw: true
          })
          console.log(spot)

          //Determine if image contains a url link
          if (image) { // if image exists, set the url of the image equal to the value of previewImage
              spot.previewImage = image.url
          } else {
              spot.previewImage = null
          }
          const images = await Image.findAll({
            attributes: [ 'id', ['spotId', 'imageableId'], 'url' ],
            where: { spotId: spot.id }
          })
          spot.Images = images
      }

      res.status(200)
      res.json({ allSpots })
  }
})
module.exports = router;
