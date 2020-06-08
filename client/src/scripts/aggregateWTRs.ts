import moment from 'moment';
import { WorkTimeRecord } from "../core/WorkTimeRecord";

/** Aggregate time returns work time in minutes */
export const aggregateWTRs = (workTimeHours: Array<WorkTimeRecord>) => {
	if (!workTimeHours)
		return 0;
		
	let sum = 0;

	for (let i = 0; i < workTimeHours.length; i++) {
		let to = parseInt(workTimeHours[i].to);
		let from = parseInt(workTimeHours[i].from);
		
		if (!workTimeHours[i].to)
			continue;
	
		sum += moment(to).diff(moment(from), "minutes");
	}
	return sum;
}