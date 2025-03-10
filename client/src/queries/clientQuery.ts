import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      name
      email
      phone
      id
    }
  }
`;
