const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const {  restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router()

// Delete an Image
router.delete('/:imageId',requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId
  const image = await Image.findByPk(imageId)

  if (!image) {
    res.json({
      message: "Image couldn't be found",
      statusCode: 404
    })
  }

  if (image.userId === req.user.id) {
    image.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

})
  module.exports = router