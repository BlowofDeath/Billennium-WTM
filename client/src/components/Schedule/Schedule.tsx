import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from '../Calendar/Calendar';
import { CalendarRenderableEvent, CalendarEvent } from '../Calendar/Context';
import { EventBlock } from './Atoms';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';

// day - number 1 - 31
const json = {
	year: 2020,
	month: 4,
	allTimeRecords: [
		{
			day: 1,
			od: "8:00",
			do: "16:00"
		},
		{
			day: 2,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 3,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 4,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 5,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 6,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 7,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 8,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 30,
			od: "10:00",
			do: "15:00"
		},
		{
			day: 31,
			od: "10:00",
			do: "15:00"
		}
	]
}

const Schedule: FC = () => {
	const history = useHistory();
	const { search } = useLocation();
	const query = parse(search, { parseNumbers: true });
	const queryTime = moment([query.year as number, query.month as number]);
	const displayTime = queryTime.isValid() ? queryTime : moment();

	const [year, setYear] = useState(displayTime.year());
	const [month, setMonth] = useState(displayTime.month());

	useEffect(() => {
		if (queryTime.isValid())
			setYear(query.year as number);
	}, [query.year]);

	useEffect(() => {
		if (queryTime.isValid()){
			setMonth(queryTime.month())
		}
	}, [query.month]);

	// Convert data
	const events: Array<CalendarEvent | CalendarRenderableEvent> = json.allTimeRecords.map((record: any) => {
		let ev: CalendarRenderableEvent = {
			render: (index: number, date: number) => <EventBlock key={index}>{ record.od } - { record.do }</EventBlock>,
			date: moment([json.year, json.month, record.day]).valueOf()
		}
		return ev;
	})

	return (
		<div>
			<Calendar events={events} year={year} month={month} onMonthChange={(year, month) => {
					history.push(`/schedule?year=${year}&month=${month}`);
				}}>
				<Calendar.MonthSwitch />
				<Calendar.DayLabel />
				<Calendar.Main />
			</Calendar>
		</div>
	)
}

export default Schedule;