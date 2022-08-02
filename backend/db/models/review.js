'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Review.belongsTo(models.User,{foreignKey: 'userid', onDelete: "CACADE", hooks:true}),
      Review.belongsTo(models.Spot,{foreignKey: 'spotid', onDelete: "CACADE", hooks:true}),
      Review.belongsTo(models.Image,{foreignKey: 'imageid', onDelete: "CACADE", hooks:true})
    }
  }
  Review.init({
    review: {
      type: DataTypes.STRING,
      allowNull: false
      
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        len: [1, 5]
      }

    },
    userid: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    spotid: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
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
    modelName: 'Review',
  });
  return Review;
};