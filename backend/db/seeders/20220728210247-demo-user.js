'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';  
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Justin',
        lastName: 'Gu',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Crystal',
        lastName: 'Bo',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Derik',
        lastName: 'Lu',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Chris',
        lastName: 'Willis',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Kevin',
        lastName: 'Ting',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Jung',
        lastName: 'Gu',
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Raph',
        lastName: 'Loren',
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Nate',
        lastName: 'Travis',
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Michael',
        lastName: 'Phelps',
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Chris',
        lastName: 'Ku',
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        firstName: 'Thomas',
        lastName: 'Edison',
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        firstName: 'Dwayne',
        lastName: 'Johnson',
        email: 'user11@user.io',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        firstName: 'Chris',
        lastName: 'Hemsworth',
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        firstName: 'JungKook',
        lastName: 'Kim',
        email: 'user13@user.io',
        username: 'FakeUser13',
        hashedPassword: bcrypt.hashSync('password14')
      },
      {
        firstName: 'Jimin',
        lastName: 'Hong',
        email: 'user14@user.io',
        username: 'FakeUser14',
        hashedPassword: bcrypt.hashSync('password15')
      },
      {
        firstName: 'Jung',
        lastName: 'Guu',
        email: 'user15@user.io',
        username: 'FakeUser15',
        hashedPassword: bcrypt.hashSync('password16')
      },
      {
        firstName: 'Taeyang',
        lastName: 'Soon',
        email: 'user16@user.io',
        username: 'FakeUser16',
        hashedPassword: bcrypt.hashSync('password16')
      },
    
    ], {});
  },
//
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users'; 
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};








