import { gql } from "apollo-server-express";

const projectType = gql`
  type Query {
    project(id: ID!): Project
    projects(isClosed: Boolean): [Project]
  }

  type Project {
    id: ID!
    name: String!
    description: String
    isClosed: Boolean!
    isPinned: Boolean!
    workTimeRecords: [WorkTimeRecord]
    users: [User]
    wtrsPerMonth(month: Int!, year: Int!): [WorkTimeRecord]
  }

  type Mutation {
    addProject(name: String!, description: String, isPinned: Boolean): Project!
    updateProject(
      id: ID!
      name: String
      description: String
      isClosed: Boolean
      isPinned: Boolean
    ): Project!
    removeProject(id: ID!): Project
  }
`;

export default projectType;
