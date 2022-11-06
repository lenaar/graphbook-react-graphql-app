"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersAndChats = Promise.all([
      queryInterface.sequelize.query("SELECT id from Users;"),
      queryInterface.sequelize.query("SELECT id from Chats;"),
    ]);

    return usersAndChats.then((rows) => {
      const [users] = rows[0];
      const [chats] = rows[1];
      const [user1, user2] = users;
      return queryInterface.bulkInsert(
        "users_chats",
        [user1, user2].map(({ id }) => ({
          userId: id,
          chatId: chats[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users_chats", null, {});
  },
};
