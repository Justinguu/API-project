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
        }
      ],
      {}
    )},

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spot", null, {});
  },
};
