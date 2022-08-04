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
  
  //Edit a Review

router.put("/:reviewId", async (req, res) => {
  
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



module.exports = router;