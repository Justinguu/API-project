'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Reviews', [
        {
        
          userId: 1,
          spotId: 1,
          review: "This was an awesome spot!",
          stars: 4.8
        },

        {
        
          userId: 2,
          spotId: 2,
          review: "This was an alright spot!",
          stars: 4.0
        },

        {
          userId: 3,
          spotId: 3,
          review: "This was mediocre spot!",
          stars: 3.5
        },
        
       
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('Reviews', null, {});
     
  }
};
