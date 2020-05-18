import { gql } from "apollo-server";

const monthType = gql`
  type Query {
    month(token: String!, month: Int!, year: Int!): Month!
    monthForAllUsers(token: String!, month: Int!, year: Int!): [Month]
  }

  type Month {
    id: ID!
    month: Int!
    year: Int!
    isClosed: Boolean!
    userId: User!
    workTimeRecords: [WorkTimeRecord]
  }
`;

export default monthType;
