import { gql } from "apollo-server";

const workTimeRecordType = gql`
  type Query {
    workTimeRecord: WorkTimeRecord!
    workTimeRecords: [WorkTimeRecord]
  }

  type WorkTimeRecord {
    id: ID!
    day: Int!
    from: String!
    to: String
    month: Month!
    user: User!
    project: Project!
  }

  type Mutation {
    startWorkTimeRecord(token: String!, projectId: ID!): WorkTimeRecord
    stopWorkTimeRecord(token: String!): WorkTimeRecord
    updateWorkTimeRecord(
      token: String!
      id: ID!
      day: Int!
      from: String!
      to: String!
    ): WorkTimeRecord!
    removeWorkTimeRecord(token: String!, id: ID!): String!
  }
`;

export default workTimeRecordType;
