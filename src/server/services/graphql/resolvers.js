import { faker } from "@faker-js/faker";

let posts = [1, 2].map((id) => ({
  id,
  text: faker.lorem.paragraph(),
  user: { avatar: faker.image.avatar(), username: faker.internet.userName() },
}));

const resolvers = {
  RootQuery: {
    posts(root, args, context) {
      return posts;
    },
  },
  RootMutation: {
    addPost(root, { post, user }, context) {
      const postObject = {
        ...post,
        user,
        id: posts.length + 1,
      };
      posts.push(postObject);
      logger.log({ level: "info", message: "Post was created" });
      return postObject;
    },
  },
};

export default resolvers;
