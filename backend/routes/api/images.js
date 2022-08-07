const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const {  restoreUser, requireAuth } = require('../../utils/auth');
const { Image } = require("../../db/models")
const router = express.Router()





router.delete("/:imageId", requireAuth, restoreUser, async (req, res) => {
  const { imageId } = req.params;
  const destoryImages = await Image.findByPk(imageId);


  if (!destoryImages) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await destoryImages.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});
  module.exports = router