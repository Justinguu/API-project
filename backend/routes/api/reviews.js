const express = require("express");
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, sequelize, User, Booking } = require("../../db/models");
const router = express.Router();


//get all reviews of current
router.get("/current", requireAuth, async (req, res) => {
    //using file path of /current bc spot is already implied
    //   console.log(req.user);
    const userId = req.user.dataValues.id;
    const allReviewsByCurr = await Spot.findAll({
      include: [{ model: User, where: { id: userId }, as: 'Owner' }],
    });
    res.json({ allReviewsByCurr });
  });
  
  //Edit a Review

router.put("/:reviewId",requireAuth, async (req, res) => {
  
  const { reviewId } = req.params;
  const {  review, stars } = req.body;
    console.log(reviewId);
  const editReview = await Review.findByPk(reviewId);

  if (editReview) {
    editReview.set({
     review, stars
    });
    await editReview.save();
    res.json(editReview);
  } 
  else if (stars < 1 || stars > 5) {
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
    res.status(404); //EDIT A SPOT ERROR CHECK
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
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
      res.status(404)
      return res.json(
          {
              "message": "Review couldn't be found",
              "statusCode": 404
          }
      )
  }

  const { url, previewImage } = req.body;

  const newImage = await Image.create({
      url,
      previewImage,
      userId: req.user.id,
      reviewId: req.params.reviewId
  })
})


//Delete a Review 
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const currentReview = await Review.findByPk(reviewId);


  if (!currentReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await currentReview.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});


module.exports = router;