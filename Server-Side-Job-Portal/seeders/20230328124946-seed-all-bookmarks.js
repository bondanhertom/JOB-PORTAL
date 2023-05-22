'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../data/bookmark.json").Bookmarks
    dataUsers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Bookmarks', dataUsers);//param 1 nama tablenya
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
