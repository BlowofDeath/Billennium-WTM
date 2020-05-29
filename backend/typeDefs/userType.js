import { gql } from "apollo-server";

const userType = gql`
  type Query {
    users: [User]
    user(email: String!): User
  }

  type User {
    id: ID!
    role: Role!
    email: String!
    first_name: String!
    last_name: String!
    projects: [Project]
    salary: Int
    isActive: Boolean!
  }

  type Mutation {
    signup(
      role: String!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      salary: Int
      isActive: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
    logout(token: String!): String!
    updateUser(
      token: String!
      id: ID!
      email: String
      first_name: String
      last_name: String
      salary: Int
      isActive: Boolean
      role: Role
    ): User!
    removeUser(id: ID!): User
  }

  type Auth {
    token: String
    user: User
  }

  enum Role {
    Pracownik
    Kierownik
    Admin
  }
`;

export default userType;
