"use strict";
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';  
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "Seoul",
          state: "Korea",
          country: "South Korea",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "The Lounge",
          description: "Place where dreams are created",
          price: 123
        },
        {
          ownerId: 2,
          address: "232 Parkview Dr",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 58.7645358,
          lng: -222.4730327,
          name: "Getaway House",
          description: "Place where web developers are created",
          price: 400
        },
        {
          ownerId: 3,
          address: "123 Memory Lane",
          city: "Campose",
          state: "Mong",
          country: "Indoneisa",
          lat: 50.7645358,
          lng: -111.4730327,
          name: "The Benelovent",
          description: "Place where dreams are created, memories are made",
          price: 250
        },
        {
          ownerId: 4,
          address: "123 PiedMont Park",
          city: "Manchester",
          state: "Washington",
          country: "Africa",
          lat: 50.7645328,
          lng: 11.4730327,
          name: "Nautilus",
          description: "Place where dreams are created",
          price: 190
        },
        {
        ownerId: 5,
        address: "735 Savage Drive",
        city: "Taepei",
        state: "Taiwan",
        country: "South America",
        lat: 25.7645328,
        lng: 14.4730327,
        name: "Cootolio",
        description: "Place where dreams are created, memories are made",
        price: 350
      },
      {
        ownerId: 6,
        address: "735 Carlton Avenue",
        city: "Mumbai",
        state: "India",
        country: "Europe",
        lat: 50.7645328,
        lng: 24.4730327,
        name: "King",
        description: "Place where dreams are created, memories are made",
        price: 458
      },
      {
        ownerId: 7,
        address: "435 West Side",
        city: "London",
        state: "England",
        country: "South America",
        lat: 52.7645328,
        lng: 24.4730427,
        name: "Queen",
        description: "Place where dreams are created, memories are made",
        price: 670
      },
      {
        ownerId: 8,
        address: "455 Crown Rink",
        city: "Lyon",
        state: "France",
        country: "Asia",
        lat: 62.7645328,
        lng: 74.4730427,
        name: "Ash",
        description: "Place where dreams are created, memories are made",
        price: 864
      },
      {
        ownerId: 9,
        address: "323 Justins World",
        city: "Seoul",
        state: "Busan",
        country: "Asia",
        lat: 32.7645328,
        lng: 54.4730427,
        name: "Jinro",
        description: "Place where dreams are created, memories are made",
        price: 435
      },
     
     
      ],
      {}
    )},

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; 
    await queryInterface.bulkDelete(options, null, {});
  },
};
