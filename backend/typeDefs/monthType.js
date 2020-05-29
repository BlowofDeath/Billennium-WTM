import { gql } from "apollo-server";

const monthType = gql`
  type Query {
    month(token: String!, month: Int!, year: Int!): Month
    monthForAllUsers(
      token: String!
      month: Int!
      year: Int!
      status: Status
    ): [Month]
    monthsForAllUsersByYear(year: Int!, status: Status): [Month]
    monthsForUserByYear(userId: ID!, year: Int!): [Month]
    monthsForAllUsersBetween(
      fromYear: Int
      fromMonth: Int
      toMonth: Int
      toYear: Int
      status: Status
    ): [Month]
  }

  enum Status {
    OPEN
    CLOSED
    AWAITING
  }

  type Month {
    id: ID!
    month: Int!
    year: Int!
    status: Status!
    workTimeRecords: [WorkTimeRecord]
    user: User!
  }

  type Mutation {
    updateMonthStatus(id: ID!, status: Status!): Month!
  }
`;

export default monthType;
