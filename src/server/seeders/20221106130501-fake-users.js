"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "Users",
      [1, 2].map((id) => ({
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        createdAt: faker.date.between(
          "2019-01-01T00:00:00.000Z",
          "2021-07-01T00:00:00.000Z"
        ),
        updatedAt: faker.date.between(
          "2022-07-01T00:00:00.000Z",
          "2022-11-05T00:00:00.000Z"
        ),
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
