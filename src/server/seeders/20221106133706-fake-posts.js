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
    return queryInterface.sequelize
      .query("SELECT id from Users;")
      .then((users) => {
        console.log("users", users);
        const userRows = users[0];
        console.log("userRows", userRows);
        return queryInterface.bulkInsert(
          "Posts",
          [0, 1, 2, 3].map((userRowIndex) => ({
            userId: userRows[userRowIndex].id,
            text: faker.lorem.paragraph(),
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
          {}
        );
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
