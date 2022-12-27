const typeDefinitions = `
  directive @auth on QUERY | FIELD_DEFINITION | FIELD
  
  scalar Upload

  type Auth {
    token: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

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

  type Response {
    success: Boolean
  }
  
  type UserSearch {
    users: [User]
  }

  type RootQuery {
    chat(chatId: Int): Chat
    chats: [Chat] @auth
    currentUser: User @auth
    posts: [Post]
    postsFeed(page: Int, limit: Int, username: String): PostFeed @auth
    usersSearch(page: Int, limit: Int, text: String!): UserSearch
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
    addMessage (
      message: MessageInput!
    ): Message
    addPost (
      post: PostInput!
    ): Post
    deletePost (
      postId: Int!
    ): Response
    login (
      email: String!
      password: String!
    ): Auth
    signup (
      username: String!
      email: String!
      password: String!
    ): Auth
    uploadAvatar (
      file: Upload!
    ): File @auth
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `;

export default [typeDefinitions];
