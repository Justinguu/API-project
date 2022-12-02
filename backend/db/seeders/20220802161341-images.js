'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Images'; 
     await queryInterface.bulkInsert(options, [
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
      spotId: 7,
      reviewId: null,
      userId: 7
     },
     {
      url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
      previewImage: true,
      spotId: 8,
      reviewId: null,
      userId: 8
     },
     {
      url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
      previewImage: true,
      spotId: 9,
      reviewId: null,
      userId: 9
     },
     {
      url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80',
      previewImage: true,
      spotId: 10,
      reviewId: null,
      userId: 10
     },
     {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      previewImage: true,
      spotId: 11,
      reviewId: null,
      userId: 11
     },
     {
      url: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
      previewImage: true,
      spotId: 12,
      reviewId: null,
      userId: 12
     },
     {
      url: 'https://images.unsplash.com/photo-1563720223809-b9a3d1694e2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      previewImage: true,
      spotId: 13,
      reviewId: null,
      userId: 13
     },
     {
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      previewImage: true,
      spotId: 14,
      reviewId: null,
      userId: 14
     },
     
     

     
     

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images'; 
  
     await queryInterface.bulkDelete(options, null, {});
  
  }
};
