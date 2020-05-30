import { User } from "./User";
import { WorkTimeRecord } from "./WorkTimeRecord";

export interface Settlement {
	/** */
	id: 		string;
	/** settlement's year */
	year:  		number;
	/** settlement's month */
	month: 		number;
	/** temporary - should be replaced with status: CLOSED | AWAITS | OPENED */
	isClosed: 	boolean;
	/** */
	user: 		User;
	/** */
	workTimeRecords: Array<WorkTimeRecord>;
}