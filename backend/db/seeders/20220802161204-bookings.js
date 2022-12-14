'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
//
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'; 
     await queryInterface.bulkInsert(options, [{
      
        spotId: 1,
        userId: 1,
        startDate: new Date ("2022-09-19"),
        endDate: new Date ("2022-10-27")
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2022-2-20"),
        endDate: new Date ("2022-4-14")
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2022-01-22"),
        endDate: new Date ("2022-12-22")
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'; 
     await queryInterface.bulkDelete(options, null, {});
     
  }
};
