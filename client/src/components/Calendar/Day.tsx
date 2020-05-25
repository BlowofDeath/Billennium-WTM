import React, { FC } from 'react';
import moment from 'moment';
import { StyledDay, StyledDayNumber } from './Atoms';
import { CalendarEvent, CalendarRenderableEvent, isRenderableEvent } from './Context';

interface IProps {
	date: number,
	events: Array<CalendarEvent | CalendarRenderableEvent>,
	timeline: boolean
}

const Day: FC<IProps> = ({ date, events, timeline }) => {
	const day = moment(date);

	return (
		<StyledDay timeline={timeline}>
			<StyledDayNumber timeline={timeline}>
				<span>
					{ day.format('DD') }
				</span>
				<span>
					{ timeline && day.format('ddd') }
				</span>
			</StyledDayNumber>
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
	events: [],
	timeline: false
}

export default Day;