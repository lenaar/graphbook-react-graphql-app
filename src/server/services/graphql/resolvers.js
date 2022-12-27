import Sequelize from "sequelize";
import logger from "../../helpers/logger";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { JWT_SECRET } from "../../config";
import json from "../../config";

import aws from "aws-sdk";

const s3 = new aws.S3({
  signatureVersion: "v4",

  region: "eu-north-1",
});

const Op = Sequelize.Op;

export default function resolver() {
  const { db } = this;
  const { Chat, Message, Post, User } = db.models;
  const resolvers = {
    Chat: {
      lastMessage(chat, arg, context) {
        return chat
          .getMessages({ limit: 1, order: [["id", "DESC"]] })
          .then((message) => message[0]);
      },
      messages(chat, args, context) {
        return chat.getMessages({ order: [["id", "ASC"]] });
      },
      users(chat, arg, context) {
        return chat.getUsers();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Upload: GraphQLUpload,
    RootQuery: {
      chat(root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [{ model: User, required: true }, { model: Message }],
        });
      },
      chats(root, args, context) {
        return Chat.findAll({
          include: [
            {
              model: User,
              required: true,
              through: { where: { userId: context.user.id } },
            },
            {
              model: Message,
            },
          ],
        });
      },
      currentUser(root, args, context) {
        return context.user;
      },
      posts(root, args, context) {
        return Post.findAll({ order: [["createdAt", "DESC"]] });
      },
      postsFeed(root, { page, limit, username }, context) {
        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }
        let query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }
        if (username) {
          query.include = [{ model: User }];

          query.where = { "$User.username$": username };
        }
        return { posts: Post.findAll(query) };
      },
      usersSearch(root, { page, limit, text }, context) {
        if (text.length < 3) return { users: [] };
        let skip = 0;
        if (page && limit) skip = page * limit;
        const query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) query.limit = limit;
        query.where = {
          username: {
            [Op.like]: `%${text}%`,
          },
        };
        return { users: User.findAll(query) };
      },
    },
    RootMutation: {
      addChat(root, { chat }, context) {
        return Chat.create().then((newChat) => {
          return Promise.all([newChat.setUsers(chat.users)]).then(() => {
            logger.log({
              level: "info",
              message: "Chat was created",
            });
            return newChat;
          });
        });
      },
      addMessage(root, { message }, context) {
        return Message.create({ ...message }).then((newMessage) => {
          return Promise.all([
            newMessage.setUser(context.user.id),
            newMessage.setChat(message.chatId),
          ]).then(() => {
            logger.log({
              level: "info",
              message: `Message was created by ${context.user.username}`,
            });
            return newMessage;
          });
        });
      },
      addPost(root, { post }, context) {
        return Post.create({
          ...post,
        }).then((newPost) => {
          return Promise.all([newPost.setUser(context.user.id)]).then(() => {
            logger.log({
              level: "info",
              message: `Post was created by ${context.user.username}`,
            });
            return newPost;
          });
        });
      },
      deletePost(root, { postId }, context) {
        return Post.destroy({
          where: {
            id: postId,
          },
        }).then(
          function (rows) {
            if (rows === 1) {
              logger.log({
                level: "info",
                message: "Post " + postId + "was deleted",
              });
              return {
                success: true,
              };
            }
            return {
              success: false,
            };
          },
          function (err) {
            logger.log({
              level: "error",
              message: err.message,
            });
          }
        );
      },
      login(root, { email, password }, context) {
        return User.findAll({
          where: {
            email,
          },
          raw: true,
        }).then(async (users) => {
          if (users.length == 1) {
            const [user] = users;
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
              throw new Error("Password does not match");
            }
            const token = JWT.sign({ email, id: user.id }, JWT_SECRET, {
              expiresIn: "1d",
            });
            return {
              token,
            };
          } else throw new Error("User not found");
        });
      },
      signup(root, { email, password, username }, context) {
        return User.findAll({
          where: { [Op.or]: [{ email }, { username }] },
          raw: true,
        }).then(async (users) => {
          if (users.length) throw new Error("User already exists");
          else
            return bcrypt.hash(password, 10).then((hash) =>
              User.create({
                email,
                password: hash,
                username,
                activated: 1,
              }).then((newUser) => {
                const token = JWT.sign({ email, id: newUser.id }, JWT_SECRET, {
                  expiresIn: "1d",
                });
                return { token };
              })
            );
        });
      },
      async uploadAvatar(root, { file }, context) {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const bucket = "apollo-book-lra";
        const params = {
          Bucket: bucket,
          Key: `${context.user.id}/${filename}`,
          ACL: "public-read",
          Body: createReadStream(),
        };
        const response = await s3.upload(params).promise();

        return User.update(
          { avatar: response.Location },
          { where: { id: context.user.id } }
        ).then(() => ({ filename, url: response.Location }));
      },
    },
  };

  return resolvers;
}
