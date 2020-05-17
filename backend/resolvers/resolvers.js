import GMR from "graphql-merge-resolvers";
import userResolver from "./userResolver";

const resolvers = GMR.merge([userResolver]);

export default resolvers;
