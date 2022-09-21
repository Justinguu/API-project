'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Reviews', [
        {
        
          userId: 1,
          spotId: 3,
          review: "This was an awesome spot!",
          stars: 4.8
        },

        {
        
          userId: 2,
          spotId: 4,
          review: "This was an alright spot!",
          stars: 4.0
        },

        {
          userId: 3,
          spotId: 2,
          review: "This was mediocre spot!",
          stars: 3.5
        },
        {
        
          userId: 4,
          spotId: 5,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        {
        
          userId: 5,
          spotId: 6,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        {
        
          userId: 6,
          spotId: 7,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        {
        
          userId: 7,
          spotId: 8,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        {
        
          userId: 8,
          spotId: 9,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        {
        
          userId: 9,
          spotId: 1,
          review: "This was an awesome spot!",
          stars: 4.8
        },
        
       
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('Reviews', null, {});
     
  }
};
