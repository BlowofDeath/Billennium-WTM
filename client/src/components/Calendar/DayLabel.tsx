import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

const StyledList = styled.ul`
	display: flex;
	list-style-type: none;
	width: 100%;
	background: rgb(33, 126, 218);
	color: #fff;
`;

const StyledDay = styled.li`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const DayLabel: FC = () => {
	const days: Array<ReactNode> = [];
	const from: Moment = moment().day("Monday").subtract(1, "day");
	
	const it: Moment = moment().day("Monday");

	while (it.isBetween(from, from.clone().add(8, "day"))) {
		days.push(<StyledDay key={ it.toString() }>{ it.format("ddd") }</StyledDay>);
		it.add(1, "day");
	}

	return (
		<StyledList>
			{ days }
		</StyledList>
	)
}

export default DayLabel;