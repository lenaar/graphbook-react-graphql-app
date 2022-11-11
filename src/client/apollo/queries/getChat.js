import { gql, useQuery } from "@apollo/client";
import { USER_ATTRIBUTES } from "../fragments/userAttributes";

// userAttributes comes from USER_ATTRIBUTES
export const GET_CHAT = gql`
  query chat($chatId: Int!) {
    chat(chatId: $chatId) {
      id
      users {
        id
        ...userAttributes
      }
      messages {
        id
        text
        user {
          id
        }
      }
    }
  }
  ${USER_ATTRIBUTES}
`;

export const useGetChatQuery = (chatId) =>
  useQuery(GET_CHAT, {
    variables: { chatId },
  });
