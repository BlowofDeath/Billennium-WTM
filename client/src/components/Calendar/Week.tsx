import React, { FC, ReactNode } from 'react';
import moment, { Moment } from 'moment';
import Day from './Day';
import { StyledWeek } from './Atoms';
import { Events } from './Context';

interface IProps {
	start: Moment,
	month?: Moment,
	events: any
}

const Week: FC<IProps> = ({ start, month = moment(), events }) => {
	let days: Array<ReactNode> = [];
	const from: Moment 	= start.clone().subtract(1, "day");
	const to: Moment 	= start.clone().add(7, "days");

	console.log(events)

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

Week.defaultProps = {
	events: []
}

export default Week;