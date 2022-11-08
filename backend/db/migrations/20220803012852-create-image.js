'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      previewImage: {
        type: Sequelize.BOOLEAN,
       
      
      },
      spotId: {
        type: Sequelize.INTEGER,
       
   
        references: { model: 'Spots'}, onDelete: "cascade"
      },
      reviewId: {
        type: Sequelize.INTEGER,
        
        references: { model: 'Reviews'}, onDelete: "cascade"
      },
      userId: {
        type: Sequelize.INTEGER,
    
        references: { model: 'Users'}, onDelete: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images',options);
  }
};