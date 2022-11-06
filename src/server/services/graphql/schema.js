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

  input ChatInput {
    users: [Int]
  }

  input PostInput {
    text: String!
  }
  
  type RootMutation {
    addChat (
      chat: ChatInput!
    ): Chat
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
