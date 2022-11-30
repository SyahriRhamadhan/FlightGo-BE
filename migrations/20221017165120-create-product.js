'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      image_product:{
        type: Sequelize.STRING
      },
      deskripsi: Sequelize.TEXT,
      kotaAsal: Sequelize.STRING,
      bandaraAsal: Sequelize.STRING,
      kotaTujuan: Sequelize.STRING,
      bandaraTujuan: Sequelize.STRING,
      idCountryAsal: Sequelize.STRING,
      idCountryTujuan: Sequelize.STRING,
      typeFlight: Sequelize.STRING,
      typeTrip: Sequelize.STRING,
      timeGo: Sequelize.STRING,
      timeBack: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};