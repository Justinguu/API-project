const express = require("express");
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const router = express.Router();


//get all reviews of current
router.get('/current', requireAuth,  async (req, res) => {
  let userId = req.user.dataValues.id

  const allCurReviews = await Review.findAll({
      include: [  // include the user, spot, image
          { model: User, where: { id: userId } },
          { model: Spot },
          { model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url'] }
      ]
  })
  if (allCurReviews) {
      res.status(200)
      res.json({ allCurReviews })
  }
})
  //Edit a Review

router.put("/:reviewId",requireAuth, restoreUser, async (req, res) => {
  
  const { reviewId } = req.params;
  const {  review, stars } = req.body;
  const editReviews = await Review.findByPk(reviewId);

  if (editReviews) {
    editReviews.set({
     review, stars
    });
    await editReviews.save();
    res.json(editReviews);
  } 
  else if (stars < 1 || stars > 5) {    // if its less than 1 or greater than 5
    res.status(400); //EDIT A SPOT ERROR CHECK
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "review": "Review text is required",
          "stars": "Stars must be an integer from 1 to 5",
        }
      }
    });
  } else {
    res.status(404); //Throw error
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        
          "message": "Review couldn't be found",
          "statusCode": 404
  
      }
  })
}
})


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res) => {
  // DECONSTRUCT SPOT ID
  const reviewId = req.params = req.params.reviewId;


  const { user } = req       //DECONSTRUCT USER, URL & PREVIEW IMAGE
  const { url, previewImage } = req.body


  //IF USER DOESN'T EXIST - THROW ERROR
  if (!user) return res.status(401).json
  ({ "message": "You need to be logged in to make any changes", "statusCode": 401 })


  const review = await Spot.findByPk(reviewId)   //CONFIRM IF SPOT ID EXISTS


  
  if (!review) {     //THROW ERROR IF SPOT COULD NOT BE FOUND
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }

  const image = await Image.create({ url, previewImage, reviewId, userId: user.id })

  
  const obj = {}   //DEFINE AN OBJECT IN ORDER TO MAKE THE ASSOCIATION
  obj.id = image.id
  obj.imageableId = parseInt(reviewId)
  obj.url = image.url

  res.status(200).json(obj)
})

//Delete a Review 
router.delete("/:reviewId", requireAuth, restoreUser, async (req, res) => {
  const { reviewId } = req.params;
  const destoryReview = await Review.findByPk(reviewId);


  if (!destoryReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await destoryReview.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});


module.exports = router;