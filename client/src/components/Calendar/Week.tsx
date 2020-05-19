import React, { FC, ReactNode } from 'react';
import moment, { Moment } from 'moment';
import Day from './Day';
import { StyledWeek } from './Atoms';
import { CalendarRenderableEvent, CalendarEvent } from './Context';

interface IProps {
	start: Moment,
	month?: Moment,
	events: Array<CalendarEvent | CalendarRenderableEvent>
}

const Week: FC<IProps> = ({ start, month = moment(), events }) => {
	let days: Array<ReactNode> = [];
	const from: Moment 	= start.clone().subtract(1, "day");
	const to: Moment 	= start.clone().add(7, "days");

	let it: Moment = start.clone();
	// Render days in week
	while (it.isBetween(from, to)) {
		let dayEvents: Array<CalendarRenderableEvent | CalendarEvent> = events.filter((value: CalendarEvent | CalendarRenderableEvent) => {
			return it.isSame(moment(value.date), "day");
		});

		days.push(<Day key={ it.toString() } events={dayEvents} label={it.get("date")}/>);
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