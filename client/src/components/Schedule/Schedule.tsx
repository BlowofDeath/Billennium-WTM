import React, { FC, useState, useEffect, useContext } from 'react';
import moment, { Moment } from 'moment';
import Calendar from '../Calendar/Calendar';
import { CalendarRenderableEvent, CalendarEvent } from '../Calendar/Context';
import { Context } from '../App/Context';
import { EventBlock } from './Atoms';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { useQuery } from '@apollo/react-hooks';
import { UserScheduleQuery } from '../../queries';

const Schedule: FC = () => {
	const { token } = useContext(Context);
	const history = useHistory();
	const { search } = useLocation();

	const query = parse(search, { parseNumbers: true });
	const queryTime = moment([query.year as number, query.month as number]);
	const displayTime = queryTime.isValid() ? queryTime : moment();

	const [year, setYear] = useState<number>(displayTime.year());
	const [month, setMonth] = useState<number>(displayTime.month());

	const { data, error, loading, refetch } = useQuery(UserScheduleQuery, {
		variables: {
			token,
			month: month + 1,
			year
		}
	});

	refetch();

	useEffect(() => {
		if (queryTime.isValid())
			setYear(query.year as number);
	}, [query.year, queryTime]);

	useEffect(() => {
		if (queryTime.isValid()){
			setMonth(queryTime.month())
		}
	}, [query.month, queryTime]);

	if (loading)
		return <div>Loading...</div>;

	if (error)
		return <div>Error...</div>;

	// Convert data
	const events: Array<CalendarEvent | CalendarRenderableEvent> = data?.month?.workTimeRecords.map((record: any) => {
		let wtrFrom: Moment = moment(parseInt(record.from));
		let wtrTo: Moment = moment(parseInt(record.to ?? Date.now()));

		let ev: CalendarRenderableEvent = {
			render: (index: number, date: number) => (
				<EventBlock key={index}>
					{ wtrFrom.format("HH:mm") } - { wtrTo.format("HH:mm") }<br/>
					{ record.project.name }
				</EventBlock>
			),
			date: moment([wtrFrom.year(), wtrFrom.month(), record.day]).valueOf()
		}
		return ev;
	});

	return (
		<div>
			<Calendar
				timeline
				events={events}
				year={year}
				month={month}
				onMonthChange={(year, month) => {
					history.push(`/schedule?year=${year}&month=${month}`);
				}}>
				<Calendar.MonthSwitch />
				<Calendar.DayLabel />
				<Calendar.Board/>
			</Calendar>
		</div>
	)
}

export default Schedule;