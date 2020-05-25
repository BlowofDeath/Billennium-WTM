import { gql } from "apollo-server";

const monthType = gql`
  type Query {
    month(token: String!, month: Int!, year: Int!): Month
    monthForAllUsers(token: String!, month: Int!, year: Int!): [Month]
    monthsForAllUsersByYear(year: Int!): [Month]
    monthsForUserByYear(userId: ID!, year: Int!): [Month]
  }

  type Month {
    id: ID!
    month: Int!
    year: Int!
    isClosed: Boolean!
    workTimeRecords: [WorkTimeRecord]
    user: User!
  }
`;

export default monthType;