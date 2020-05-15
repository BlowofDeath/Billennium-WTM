import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    first_name: String!
    last_name: String!
  }

  type Mutation {
    user(
      role: String!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
    ): User!
  }
`;

export default typeDefs;
