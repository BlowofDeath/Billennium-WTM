import React, { FC, useContext } from 'react';
import moment, { Moment } from 'moment';
import { Context } from './Context';
import Week from './Week';

const Main: FC = () => {
	const { events, visibleMonth} = useContext(Context);
	const visableMonth: Moment = moment(visibleMonth);

	const weeks: Array<React.ReactNode> = [];

	const from: Moment 	= visableMonth.clone().startOf("month").subtract(1, "day").day("Monday");
	const to: Moment 	= from.clone().add(38, "day");

	let it: Moment = from.clone();
	let i = 0;
	// Render weeks
	while (it.isBetween(from.subtract(1, "day"), to)) {
		let weekEvents = Object.keys(events)
		.filter((value: string) => it.isSame(moment(parseInt(value)), "week"))
		.map((value: string) => events[parseInt(value)])

		weeks.push(<Week key={it.toString()} start={it.clone()} events={weekEvents}/>);
		it = it.clone().add(7, "day");
		i++;
		if (i > 1000)
			break;
	}

	return <div>{ weeks }</div>;
}

Main.defaultProps = {
	today: Date.now(),
	month: Date.now()
}

export default Main;