"use strict";
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

////
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
          type: "House",
          description: "5 guests · 4 bedrooms · 4 beds · 2 bath",
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
          type: "House",
          description: "3 guests · 2 bedroom · 2 bed · 2 bath",
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
          type: "Condo",
          description: "4 guests · 3 bedrooms · 3 beds · 2 bath",
          price: 850
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
          type: "Condo",
          description: "6 guests · 3 bedrooms · 3 beds · 3 bath",
          price: 750
        },
        {
        ownerId: 5,
        address: "735 Savage Drive",
        city: "Taepei",
        state: "Ontario",
        country: "Canada",
        lat: 25.7645328,
        lng: 14.4730327,
        name: "EverGreen",
        type: "Cabin",
        description: "3 guests · 2 bedroom · 2 bed · 2 bath",
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
        name: "Camouflage",
        type: "Omg",
        description: "8 guests · 6 bedrooms · 6 beds · 3 bath",
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
        name: "Midnight",
        type: "Omg",
        description: "5 guests · 3 bedrooms · 3 beds · 2 bath",
        price: 670
      },
      {
        ownerId: 8,
        address: "455 Crown Rink",
        city: "Lyon",
        state: "France",
        country: "Asia",
        lat: 62.7645318,
        lng: 74.4730417,
        name: "Ash",
        type: "Mansion",
        description: "10 guests · 5 bedrooms · 5 beds · 4 bath",
        price: 864
      },
      {
        ownerId: 9,
        address: "323 Justins World",
        city: "Seoul",
        state: "Busan",
        country: "Asia",
        lat: 32.7645321,
        lng: 54.4730422,
        name: "Jinro",
        type: "Mansion",
        description: "15 guests · 7 bedrooms · 7 beds · 6 bath",
        price: 435
      },
      {
        ownerId: 10,
        address: "123 Pathway Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 11.7612328,
        lng: 22.4712427,
        name: "Crown",
        type: "Condo",
        description: "8 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 542
      },
      {
        ownerId: 11,
        address: "123 Row River Drive",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 31.7443328,
        lng: 52.4720127,
        name: "Trapezoid",
        type: "Cabin",
        description: "3 guests · 1 bedrooms · 2 beds · 1 bath",
        price: 642
      },
      {
        ownerId: 12,
        address: "124 Crow River Drive",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 31.7245328,
        lng: 52.4730427,
        name: "Medici",
        type: "Omg",
        description: "6 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 645
      },
      {
        ownerId: 13,
        address: "113 Camp River Drive",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 31.7443328,
        lng: 52.4722427,
        name: "Kodak",
        type: "Cabin",
        description: "6 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 645
      },
      {
        ownerId: 14,
        address: "321 Mountain Drive",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 31.7442329,
        lng: 52.4722448,
        name: "The Cube",
        type: "Omg",
        description: "6 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 215
      },
      {
        ownerId: 15,
        address: "123 Mountain Drive",
        city: "Atlanta",
        state: "Georgia",
        country: "United States of America",
        lat: 32.7442329,
        lng: 52.4122448,
        name: "Mountain Point",
        type: "Condo",
        description: "8 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 950
      },
      {
        ownerId: 16,
        address: "123 RiverDale Drive",
        city: "tatalouii",
        state: "Ohio",
        country: "United States of America",
        lat: 32.7442329,
        lng: 52.4122448,
        name: "MultiPlex",
        type: "Apartment",
        description: "8 guests · 4 bedrooms · 4 beds · 3 bath",
        price: 2500
      },



      
     
     
      ],
      {}
    )},

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; 
    await queryInterface.bulkDelete(options, null, {});
  },
};
