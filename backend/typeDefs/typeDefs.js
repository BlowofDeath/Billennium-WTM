import { mergeTypes } from "merge-graphql-schemas";
import userType from "./userType";
import monthType from "./monthType";
import workTimeRecordType from "./workTimeRecordType";

const types = [userType, monthType, workTimeRecordType];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(types, { all: true });
