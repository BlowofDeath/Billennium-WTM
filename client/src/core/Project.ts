import { WorkTimeRecord } from "./WorkTimeRecord";
import { User } from "./User";

export interface Project {
	id: 				string;
	name: 				string;
	description: 		string;
	isClosed: 			boolean;
	isPinned: 			boolean;
	workTimeRecords?: 	Array<WorkTimeRecord>;
	users?: 			Array<User>;
	wtrsPerMonth?: 		Array<WorkTimeRecord>;
}