'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [      
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: await bcrypt.hash("123456", 10), //setup with bcrypt encrypt
          role:"admin",
          createdAt: Date.now()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};