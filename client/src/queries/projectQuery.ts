import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      name
      status
      id
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      name
      description
      status
      id
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
