import React, { FC, ReactNode } from 'react';
import moment, { Moment } from 'moment';
import Day from './Day';
import { StyledWeek } from './Atoms';
import { CalendarRenderableEvent, CalendarEvent } from './Context';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface IProps {
	start: Moment,
	month: number,
	events: Array<CalendarEvent | CalendarRenderableEvent>,
	style?: CSSProperties,
	timeline: boolean
}

const Week: FC<IProps> = ({ start, month, events, timeline, style }) => {
	let days: Array<ReactNode> = [];

	const monthMoment: Moment = moment(month);
	const from: Moment 	= start.clone().subtract(1, "day");
	const to: Moment 	= start.clone().add(7, "days");

	let it: Moment = start.clone();
	// Render days in week
	while (it.isBetween(from, to)) {
		let dayEvents: Array<CalendarRenderableEvent | CalendarEvent> = events.filter((value: CalendarEvent | CalendarRenderableEvent) => {
			return it.isSame(moment(value.date), "day");
		});

		if (!timeline || (timeline && it.isSame(monthMoment, "month")))
			days.push(<Day key={ it.toString() } events={dayEvents} date={it.valueOf()} timeline={timeline}/>);

		
		it.add(1, "day");
	}

	return (
		<StyledWeek timeline={timeline} style={{ ...style }}>
			{ days }
		</StyledWeek>
	)
}

Week.defaultProps = {
	events: [],
	style: {},
	timeline: false
}

export default Week;