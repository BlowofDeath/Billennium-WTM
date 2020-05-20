import { gql } from "apollo-server";

const projectType = gql`
  type Query {
    project(id: ID!): Project!
    projects(isClosed: Boolean): [Project]
  }

  type Project {
    id: ID!
    name: String!
    description: String
    isClosed: Boolean!
    workTimeRecords: [WorkTimeRecord]
    users: [User]
  }

  type Mutation {
    addProject(name: String!, description: String): Project!
    updateProject(
      id: ID!
      name: String!
      description: String!
      isClosed: Boolean!
    ): Project!
    removeProject(id: ID!): Project
  }
`;

export default projectType;
