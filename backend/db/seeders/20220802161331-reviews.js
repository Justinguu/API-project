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
          review: "Accommodation was spotlessly clean and very warm. Sunny private aspect in living room. Comfortable bed.",
          stars: 4.0
        },
        {
        
          userId: 3,
          spotId: 1,
          review: "The perfect pod for a little break. Everything you could possibly need, very well equipped, Clare thought of everything! ",
          stars: 4.9
        },
        {
        
          userId: 6,
          spotId: 1,
          review: "We had a brilliant stay. The coop is fantastically comfortable, the bed especially so. Great shower too. The hot tub is amazing! ",
          stars: 4.9
        },
        {
        
          userId: 7,
          spotId: 6,
          review: "We had a brilliant stay. The coop is fantastically comfortable, the bed especially so. Great shower too. The hot tub is amazing! ",
          stars: 4.9
        },
        {
        
          userId: 4,
          spotId: 1,
          review: "Wonderful location and property.We stayed with our dog and it was all perfect. Would recommend and return happily.Thanks for everything.",
          stars: 4.9
        },

     
        
       
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
   
   await queryInterface.bulkDelete(options, null, {});
     
  }
};
