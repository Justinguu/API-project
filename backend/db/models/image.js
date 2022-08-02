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
      Image.belongsTo(models.User,{foreignKey: 'userid', onDelete: "CACADE", hooks:true}),
      Image.belongsTo(models.Spot,{foreignKey: 'spotid', onDelete: "CACADE", hooks:true}),
      Image.belongsTo(models.Review,{foreignKey: 'reviewid', onDelete: "CACADE", hooks:true})
    }
  }
  Image.init({
    url: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    previewImage: {
      type: DataTypes.STRING
    },
    spotid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    reviewid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull:false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};