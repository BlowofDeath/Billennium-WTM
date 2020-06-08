import React, { FC, useState, useEffect, Fragment } from 'react';
import moment from 'moment';

export interface TimeCounterProps {
	from: number
}

const TimeCounter: FC<TimeCounterProps> = ({ from }) => {
	const [time, setTime] = useState(Date.now());
	
	useEffect(() => {
		let interval = setInterval(() => {
			setTime(Date.now())
		}, 1000);

		return () => { clearInterval(interval) }
	}, []);

	const start = moment(time);
	const end = moment(from);
	let seconds = start.diff(end, "seconds");
	seconds = seconds < 0 ? -1 * seconds : seconds;

	return (
		<Fragment>
			{ Math.floor(seconds / 3600) }h { Math.floor(seconds / 60) % 60 }min { seconds % 60 }s
		</Fragment>
	)
}

export default TimeCounter;