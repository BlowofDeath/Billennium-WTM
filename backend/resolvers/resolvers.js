import GMR from "graphql-merge-resolvers";
import userResolver from "./userResolver";
import monthResolver from "./monthResolver";
import workTimeRecordResolver from "./workTimeRecordResolver";

const resolvers = GMR.merge([
  userResolver,
  monthResolver,
  workTimeRecordResolver,
]);

export default resolvers;
