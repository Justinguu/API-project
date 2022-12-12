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
          spotId: 2,
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

        {
        
          userId: 2,
          spotId: 1,
          review: "The JusBNB is modern, immaculately clean and a great get away for a couple. ",
          stars: 4.8
        },
        {
        
          userId: 10,
          spotId: 2,
          review: "Chic flat that was perfect for our visit. Close to the sites and cool cafes, and nice industrial vibe.",
          stars: 4.8
        },
        {
        
          userId: 3,
          spotId: 2,
          review: "The place is very stylish, comfortable spacious and clean, the bed is huge.",
          stars: 4.8
        },
        {
        
          userId: 4,
          spotId: 3,
          review: "We really enjoyed our time here. Check-in was easy and the hosts were quick to reply with any question. It is spacious and stylish.",
          stars: 4.8
        },
        {
        
          userId: 6,
          spotId: 3,
          review: "Cute spacious in a good location. The directions were super detailed and clear so it was very easy to get there.Thank you!",
          stars: 4.8
        },
        {
        
          userId: 2,
          spotId: 4,
          review: "Everything worked super well and easy, top communication, the flat is great like on the pictures and has a super comfortable bed.",
          stars: 4.0
        },

        {
          userId: 3,
          spotId: 10,
          review: "This was mediocre spot! Had the potential to be great but was not very clean and the host was not very friendly!",
          stars: 3.5
        },
        {
        
          userId: 4,
          spotId: 5,
          review: "This was an awesome spot would recommend to others! Coming back again next year with friends!!!",
          stars: 4.7
        },
        {
        
          userId: 4,
          spotId: 7,
          review: "great apartment in the best area, closeto everything. very modern and updated place with everything you may need. loved it.",
          stars: 4.6
        },
        {
        
          userId: 4,
          spotId: 8,
          review: "Such a lovely space right in the middle of old town. Easy check-in and out. The shower was especially nice, plus very comfortable beds.",
          stars: 4.7
        },
        {
        
          userId: 5,
          spotId: 6,
          review: "Cozy and beautiful apartment with everything what you need for your travel. I liked small details around the apartment a lot - so cute! ",
          stars: 4.4
        },
        {
        
          userId: 15,
          spotId: 6,
          review: "Cozy and beautiful apartment with everything what you need for your travel. I liked small details around the apartment a lot - so cute! ",
          stars: 4.4
        },
        {
        
          userId: 6,
          spotId: 7,
          review: "he apartments are excellent! Location is convenient for tourists stay, you can walk to many interesting places just by foot.",
          stars: 4.3
        },
        {
        
          userId: 8,
          spotId: 10,
          review: "This was an awesome spot!",
          stars: 4.2
        },
        {
        
          userId: 2,
          spotId: 9,
          review: "This was an awesome spot!",
          stars: 4.5
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
          review: "The spot was great but the host was not very friendly! Can't say i'd recommend this spot to others.",
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
          stars: 4.0
        },
        {
        
          userId: 14,
          spotId: 15,
          review: "The spot was great the host was very friendly!",
          stars: 4.0
        },
        {
        
          userId: 8,
          spotId: 13,
          review: "The spot was fine and had all the essentials but nothing really stood out about it.",
          stars: 3.5
        },
        {
        
          userId: 2,
          spotId: 14,
          review: "Wow what a great spot! I loved everything about it and would recommend to others!",
          stars: 3.9
        },
        {
        
          userId: 5,
          spotId: 15,
          review: "The spot was great but the host was not very friendly!",
          stars: 4.0
        },
        {
        
          userId: 16,
          spotId: 14,
          review: "Wow what a great spot! I loved everything about it and would recommend to others!",
          stars: 3.9
        },
       
       
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
   
   await queryInterface.bulkDelete(options, null, {});
     
  }
};
