'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Images', [
      {
      url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      previewImage: true,
      spotId: 2,
      reviewId: null,
      userId: 1
     },
     {
      url: 'www.HouseForRent1.com',
      previewImage: true,
      spotId: null,
      reviewId: 2,
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
