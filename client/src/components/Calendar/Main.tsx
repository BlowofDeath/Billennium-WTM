import React, { FC, useContext } from 'react';
import moment, { Moment } from 'moment';
import { Context } from './Context';
import Week from './Week';

const Main: FC = () => {
	const context = useContext(Context);
	const visableMonth: Moment = moment(context.visableMonth);

	const weeks: Array<React.ReactNode> = [];

	const from: Moment 	= visableMonth.clone().startOf("month").subtract(1, "day").day("Monday");
	const to: Moment 	= from.clone().add(38, "day");

	let it: Moment = from.clone();
	// Render all weeks
	while (it.isBetween(from.subtract(1, "day"), to)) {
		weeks.push(<Week key={it.toString()} start={it}/>);
		it = it.clone().add(7, "day");
	}

	return <div>{ weeks }</div>;
}

Main.defaultProps = {
	today: Date.now(),
	month: Date.now()
}

export default Main;