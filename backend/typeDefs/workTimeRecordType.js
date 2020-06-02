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
    startWorkTimeRecord(projectId: ID!): WorkTimeRecord
    stopWorkTimeRecord: WorkTimeRecord
    updateWorkTimeRecord(
      id: ID!
      day: Int!
      from: String!
      to: String!
    ): WorkTimeRecord!
    removeWorkTimeRecord(id: ID!): WorkTimeRecord
  }
`;

export default workTimeRecordType;
