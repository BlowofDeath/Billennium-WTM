import React, { FC, ReactNode, useContext } from 'react';
import moment, { Moment } from 'moment';
import { StyledDayLabel, StyledList } from './Atoms';
import { Context } from './Context';

const DayLabel: FC = () => {
	const { timeline } = useContext(Context);
	const days: Array<ReactNode> = [];

	const from: Moment = moment().day("Monday").subtract(1, "day");
	
	const it: Moment = moment().day("Monday");

	while (it.isBetween(from, from.clone().add(8, "day"))) {
		days.push(<StyledDayLabel key={ it.toString() }>{ it.format("ddd") }</StyledDayLabel>);
		it.add(1, "day");
	}

	return (
		<>
		{
			!timeline && <StyledList>
				{ days }
			</StyledList>
		}
		</>
	)
}

export default DayLabel;