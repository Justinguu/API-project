'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Images', [
      {
      url: 'www.HouseForRent.com',
      previewImage: true,
      spotId: null,
      reviewId: 1,
      userId: 1
     },
     {
      url: 'www.HouseForRent1.com',
      previewImage: true,
      spotId: 2,
      reviewId: null,
      userId: 2
     },
     {
      url: 'www.HouseForRent2.com',
      previewImage: true,
      spotId: 3,
      reviewId: null,
      userId: 3
     },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Images', null, {});
  
  }
};
