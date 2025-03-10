import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
  mutation deleteClient(id: "") {
    name
    email
    phone
    id
  }
`;
