'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Images', [
      {
      url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg',  
      previewImage: true,
      spotId: 1,
      reviewId: null,
      userId: 1
     },
     {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      previewImage: true,
      spotId: 2,
      reviewId: null,
      userId: 2
     },
     {
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      previewImage: true,
      spotId: 3,
      reviewId: null,
      userId: 3
     },
     {
      url: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      previewImage: true,
      spotId: 4,
      reviewId: null,
      userId: 4
     },
     {
      url: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      previewImage: true,
      spotId: 5,
      reviewId: null,
      userId: 5
     },
     {
      url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
      previewImage: true,
      spotId: 6,
      reviewId: null,
      userId: 6
     },
     {
      url: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      previewImage: true,
      spotId: 6,
      reviewId: null,
      userId: 6
     },
     {
      url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
      previewImage: true,
      spotId: 7,
      reviewId: null,
      userId: 7
     },
     {
      url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
      previewImage: true,
      spotId: 8,
      reviewId: null,
      userId: 8
     },
     {
      url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80',
      previewImage: true,
      spotId: 9,
      reviewId: null,
      userId: 9
     },
     
     

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Images', null, {});
  
  }
};
