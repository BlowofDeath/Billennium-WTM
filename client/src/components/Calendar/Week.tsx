import React, { FC, ReactNode } from 'react';
import moment, { Moment } from 'moment';
import Day from './Day';
import { StyledWeek } from './Atoms';

const Week: FC<{ start: Moment, month?: Moment }> = ({ start, month = moment() }) => {
	let days: Array<ReactNode> = [];
	const from: Moment 	= start.clone().subtract(1, "day");
	const to: Moment 	= start.clone().add(7, "days");

	let it: Moment = start.clone();
	// Render days in week
	while (it.isBetween(from, to)) {

		days.push(<Day key={ it.toString() }>{ it.get("date") }</Day>)
		it.add(1, "day");
	}

	return (
		<StyledWeek>
			{ days }
		</StyledWeek>
	)
}

export default Week;