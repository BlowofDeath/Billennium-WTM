import { gql } from "apollo-server";

const userType = gql`
  type Query {
    users: [User]
    user(email: String!): User
  }

  type User {
    id: ID!
    role: String!
    email: String!
    first_name: String!
    last_name: String!
    projects: [Project]
    salary: Float
    isActive: Boolean!
  }

  type Mutation {
    signup(
      role: String!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
    ): Auth
    login(email: String!, password: String!): Auth
    logout(token: String!): String!
    updateUser(
      token: String!
      id: ID!
      email: String!
      first_name: String!
      last_name: String!
      salary: Float!
      isActive: Boolean!
    ): User!
  }

  type Auth {
    token: String
    user: User
  }
`;

export default userType;