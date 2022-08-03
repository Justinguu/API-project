"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123
        },
        {
          ownerId: 2,
          address: "127 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 58.7645358,
          lng: -222.4730327,
          name: "Dab Academy",
          description: "Place where web developers are created",
          price: 400
        },
        {
          ownerId: 3,
          address: "123 Memory Lane",
          city: "Atlanta",
          state: "Georgia",
          country: "United States of America",
          lat: 50.7645358,
          lng: -111.4730327,
          name: "Crab Academy",
          description: "Place where web developers are created",
          price: 200
        },
     
      ],
      {}
    )},

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
