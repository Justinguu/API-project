'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User,{foreignKey: 'userId'}),
      Image.belongsTo(models.Spot,{foreignKey: 'spotId'}),
      Image.belongsTo(models.Review,{foreignKey: 'reviewId'})
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      
    
    },
    spotId: {
      type: DataTypes.INTEGER,
      
      references: { model: 'Spots'}
    },
    reviewId: {
      type: DataTypes.INTEGER,
    
      references: { model: 'Reviews'}
    },
    userId: {
      type: DataTypes.INTEGER,
      
      references: { model: 'Users'}
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};