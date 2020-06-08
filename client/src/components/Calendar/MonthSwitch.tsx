import React, { FC, useContext } from 'react';
import moment, { Moment } from 'moment';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Context } from './Context';
import { StyledSwitch, SwitchButton, DateLabel } from './Atoms';

const _previousMonth = (date: Moment): Moment => {
	return date.clone().subtract(1, "month");
}

const _nextMonth = (date: Moment): Moment => {
	return date.clone().add(1, "month");
}

const MonthSwitch: FC = () => {
	const { year, month, update } = useContext(Context);
	const currentDate: Moment = moment([year, month]);

	return (
		<StyledSwitch>
			<SwitchButton onClick={() => { update({ month: _previousMonth(currentDate).month(), year: _previousMonth(currentDate).year() })}}>
				<FiChevronLeft size={40}/>
			</SwitchButton>
				<DateLabel>{ currentDate.format("MMMM Y") }</DateLabel>
			<SwitchButton onClick={() => { update({ month: _nextMonth(currentDate).month(), year: _nextMonth(currentDate).year() })}}>
				<FiChevronRight size={40}/>
			</SwitchButton>
		</StyledSwitch>
	)
}

export default MonthSwitch;