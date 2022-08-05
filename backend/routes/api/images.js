const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const {  restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router()




//delete an image 

// router.delete('/:imageId', requireAuth, restoreUser, async (req, res) => {
//   const imageId = req.params.imageId    
//   const image = await Image.findByPk(imageId)    //pull params and find by imageId

//   if (!image) {   // if not image
//     res.json({
//       message: "Image couldn't be found",
//       statusCode: 404
//     })
//   }

//   if (image.userId === req.user.id) {   // delete success
//     image.destroy()
//     res.json({
//       message: "Successfully deleted",
//       statusCode: 200
//     })
//   }

// })

router.delete("/:imageId", requireAuth, restoreUser, async (req, res) => {
  const { imageId } = req.params;
  const currentImage = await Image.findByPk(imageId);


  if (!currentImage) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await currentImage.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});
  module.exports = router