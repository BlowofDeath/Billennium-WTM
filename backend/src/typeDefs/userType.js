import { gql } from "apollo-server-express";

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
    isActive: Boolean!
    activeWorkTimeRecord: WorkTimeRecord
  }

  type Mutation {
    signup(
      role: Role!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      isActive: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
    updateUser(
      id: ID!
      email: String
      first_name: String
      last_name: String
      isActive: Boolean
      role: Role
    ): User!
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
