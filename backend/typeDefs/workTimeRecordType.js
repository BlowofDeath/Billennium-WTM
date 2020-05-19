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
    to: String!
    month: Month!
    user: User!
  }

  type Mutation {
    startWorkTimeRecord(token: String!, projectId: ID!): WorkTimeRecord
    stopWorkTimeRecord(token: String!): WorkTimeRecord
  }
`;

export default workTimeRecordType;
