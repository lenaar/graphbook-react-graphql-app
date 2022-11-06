"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersAndChats = Promise.all([
      queryInterface.sequelize.query("SELECT id FROM Users;"),
      queryInterface.sequelize.query("SELECT id FROM Chats;"),
    ]);

    return usersAndChats.then((rows) => {
      const [users] = rows[0];
      const [chats] = rows[1];
      const [user1, user2] = users;
      return queryInterface.bulkInsert(
        "Messages",
        [user1, user2].map(({ id }) => ({
          userId: id,
          chatId: chats[0].id,
          text: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        {}
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Messages", null, {});
  },
};
