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
      url: 'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
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
      url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      previewImage: true,
      spotId: 5,
      reviewId: null,
      userId: 5
     },
     {
      url: 'https://a0.muscache.com/im/pictures/da9516c7-04a3-4787-a82e-b58c3ac5e865.jpg?im_w=1200',
      previewImage: true,
      spotId: 6,
      reviewId: null,
      userId: 6
     },
     {
      url: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
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
      url: 'https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
      previewImage: true,
      spotId: 11,
      reviewId: null,
      userId: 11
     },
     {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=1440',
      previewImage: true,
      spotId: 12,
      reviewId: null,
      userId: 12
     },
     {
      url: 'https://images.unsplash.com/photo-1589129140837-67287c22521b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      previewImage: true,
      spotId: 13,
      reviewId: null,
      userId: 13
     },
     {
      url: 'https://a0.muscache.com/im/pictures/d1105d3f-252b-487d-a901-41275a36bc8d.jpg?im_w=1200',
      previewImage: true,
      spotId: 14,
      reviewId: null,
      userId: 14
     },
     {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80',
      previewImage: true,
      spotId: 15,
      reviewId: null,
      userId: 15
     },
     {
      url: 'https://images.unsplash.com/photo-1540882082344-a56ecd70ba96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      previewImage: true,
      spotId: 16,
      reviewId: null,
      userId: 16
     },
     
     
//
     
     

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images'; 
  
     await queryInterface.bulkDelete(options, null, {});
  
  }
};
