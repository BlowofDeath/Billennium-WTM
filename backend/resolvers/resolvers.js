import GMR from "graphql-merge-resolvers";
import userResolver from "./userResolver";
import monthResolver from "./monthResolver";
import workTimeRecordResolver from "./workTimeRecordResolver";
import projectResolver from "./projectResolver";

const resolvers = GMR.merge([
  userResolver,
  monthResolver,
  workTimeRecordResolver,
  projectResolver,
]);

export default resolvers;
