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
    monthId: Month!
  }
`;

export default workTimeRecordType;
