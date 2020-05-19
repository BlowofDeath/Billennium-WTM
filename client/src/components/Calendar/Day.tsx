import React, { FC } from 'react';
import { StyledDay, StyledDayNumber } from './Atoms';
import { CalendarEvent, CalendarRenderableEvent, isRenderableEvent } from './Context';

interface IProps {
	label: any,
	events: Array<CalendarEvent | CalendarRenderableEvent>
}

const Day: FC<IProps> = ({ label, events }) => {
	return (
		<StyledDay>
			<StyledDayNumber>{ label }</StyledDayNumber>
			{
				events.map((event: CalendarEvent | CalendarRenderableEvent, index: number) => {
					if (isRenderableEvent(event)) {
						return (event as CalendarRenderableEvent).render(index, event.date);
					}
					return event.title;
				})
			}
		</StyledDay>
	)
}

Day.defaultProps = {
	events: []
}

export default Day;