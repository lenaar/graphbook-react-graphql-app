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
    lastMessage: Message
  }

  type PostFeed {
    posts: [Post]
  }

  type RootQuery {
    chat(chatId: Int): Chat
    chats: [Chat]
    posts: [Post]
    postsFeed(page: Int, limit: Int): PostFeed
  }

  input ChatInput {
    users: [Int]
  }

  input MessageInput {
    chatId: Int!
    text: String!
  }

  input PostInput {
    text: String!
  }
  
  type RootMutation {
    addChat (
      chat: ChatInput!
    ): Chat
    addMessage(
      message: MessageInput!
    ): Message
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
