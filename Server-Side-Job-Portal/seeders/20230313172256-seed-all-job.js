'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../data/data.json").Jobs
    dataUsers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Jobs', dataUsers);//param 1 nama tablenya
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Jobs', null, {});
  }
};
