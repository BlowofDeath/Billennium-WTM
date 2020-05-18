import React, { FC, useContext } from 'react';
import moment, { Moment } from 'moment';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Context } from './Context';
import { StyledSwitch, SwitchButton, DateLabel } from './Atoms';

const _previousMonth = (date: Moment): number => {
	return date.clone().subtract(1, "month").valueOf();
}

const _nextMonth = (date: Moment): number => {
	return date.clone().add(1, "month").valueOf();
}

const MonthSwitch: FC = () => {
	const { visibleMonth, update } = useContext(Context);
	const currentMonth: Moment = moment(visibleMonth);

	return (
		<StyledSwitch>
			<SwitchButton onClick={() => { update({ visibleMonth: _previousMonth(currentMonth) })}}>
				<FiChevronLeft size={40}/>
			</SwitchButton>
				<DateLabel>{ currentMonth.format("MMMM Y") }</DateLabel>
			<SwitchButton onClick={() => { update({ visibleMonth: _nextMonth(currentMonth) })}}>
				<FiChevronRight size={40}/>
			</SwitchButton>
		</StyledSwitch>
	)
}

export default MonthSwitch;