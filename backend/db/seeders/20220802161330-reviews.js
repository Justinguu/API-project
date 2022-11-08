'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
      await queryInterface.bulkInsert('options', [
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
    options.tableName = 'Reviews'; 
   
   await queryInterface.bulkDelete(options, null, {});
     
  }
};
