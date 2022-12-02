'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
      await queryInterface.bulkInsert(options, [
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
          review: "Amazing Expierence!",
          stars: 4.4
        },
        {
        
          userId: 6,
          spotId: 7,
          review: "Would Recommend to others!",
          stars: 4.3
        },
        {
        
          userId: 8,
          spotId: 10,
          review: "This was an awesome spot!",
          stars: 4.2
        },
        {
        
          userId: 9,
          spotId: 10,
          review: "The expierence could have been better!",
          stars: 3.8
        },
        {
        
          userId: 10,
          spotId: 12,
          review: "The spot was great but the host was not very friendly!",
          stars: 3.8
        },
        {
        
          userId: 10,
          spotId: 11,
          review: "The spot was great but the host was not very friendly!",
          stars: 2.8
        },
        {
        
          userId: 11,
          spotId: 12,
          review: "The spot was great but the host was not very friendly!",
          stars: 2.9
        },
        {
        
          userId: 12,
          spotId: 13,
          review: "The spot was great but the host was not very friendly!",
          stars: 3.0
        },
        {
        
          userId: 13,
          spotId: 12,
          review: "The spot was great but the host was not very friendly!",
          stars: 5.0
        },
       
        
       
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
   
   await queryInterface.bulkDelete(options, null, {});
     
  }
};
