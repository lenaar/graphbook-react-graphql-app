const typeDefinitions = `

  type User {
    id: Int
    avatar: String
    username: String
  }

  type Post {
    id: Int
    text: String
    user: User
  }

  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }

  type Chat {
    id: Int
    messages: [Message]
    users: [User]
  }

  type RootQuery {
    chat(chatId: Int): Chat
    chats: [Chat]
    posts: [Post]
  }

  input PostInput {
    text: String!
  }
  
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `;

export default [typeDefinitions];
