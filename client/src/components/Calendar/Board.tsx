import React, { FC, useContext } from 'react';
import moment, { Moment } from 'moment';
import { Context, CalendarRenderableEvent, CalendarEvent } from './Context';
import Week from './Week';

const Board: FC = () => {
	const { events, month, year, timeline } = useContext(Context);
	const currentPage: Moment = moment([year, month]);

	const weeks: Array<React.ReactNode> = [];

	const from: Moment 	= currentPage.clone().startOf("month").subtract(1, "day").day("Monday");
	const to: Moment 	= from.clone().add(38, "day");

	let it: Moment = from.clone();
	// Render weeks
	while (it.isBetween(from.subtract(1, "day"), to)) {
		let i = it.clone();

		const weekEvents = events.filter((event: CalendarRenderableEvent | CalendarEvent) => {
			return moment(event.date).isBetween(i.clone().subtract(1, "day"), i.clone().add(7, "day"));
		});

		weeks.push(<Week key={it.toString()} month={moment([year, month]).valueOf()} start={it.clone()} events={weekEvents} timeline={timeline}/>);
		it = it.clone().add(7, "day");
	}

	return <div>{ weeks }</div>;
}

export default Board;