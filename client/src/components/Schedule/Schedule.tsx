import React, { FC, useState, useEffect, useContext } from 'react';
import moment, { Moment } from 'moment';
import Calendar from '../Calendar/Calendar';
import { CalendarRenderableEvent, CalendarEvent } from '../Calendar/Context';
import { Context } from '../App/Context';
import { EventBlock } from './Atoms';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { useQuery } from '@apollo/react-hooks';
import { UserScheduleQuery } from '../../graphql/queries';
import Panel from '../Panel/Panel';
import { Row } from '../Atoms/Row';
import { Column } from '../Atoms/Column';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Button } from '@material-ui/core';
import { useSettlementHandler } from './useSettlementHandler';

const Schedule: FC = () => {
	const { token } = useContext(Context);
	const history = useHistory();
	const { search } = useLocation();

	const query = parse(search, { parseNumbers: true });
	const queryTime = moment([query.year as number, query.month as number]);
	const displayTime = queryTime.isValid() ? queryTime : moment();

	const [year, setYear] = useState<number>(displayTime.year());
	const [month, setMonth] = useState<number>(displayTime.month());

	const { closeMonth } = useSettlementHandler();
	const { data, error, loading, refetch } = useQuery(UserScheduleQuery, {
		variables: {
			token,
			month: month + 1,
			year
		}
	});

	refetch();

	console.log({data})

	useEffect(() => {
		let mounted = true;

		if (mounted && queryTime.isValid())
			setYear(query.year as number);

		return () => { mounted = false }
	}, [query.year, queryTime]);

	useEffect(() => {
		let mounted = true;

		if (mounted && queryTime.isValid()){
			setMonth(queryTime.month())
		}
		return () => { mounted = false }
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
				<Panel>
					<Row>
						<Column>
							<h2>Status miesiąca</h2>
							<SecondaryText>
								{ !data.month && 'NIEROZPOCZĘTY' }
								{ data?.month?.status === 'OPEN' && "OTWARTY" }
								{ data?.month?.status === 'CLOSED' && "ZAMKNIĘTY" }
								{ data?.month?.status === 'AWAITING' && "OCZEKUJE ROZLICZENIA" }
							</SecondaryText>
						</Column>
						<Column>
							<Button variant="outlined" color="primary" onClick={() => { closeMonth(data.month.id) }}>
								Rozlicz
							</Button>
							<SecondaryText>
								Operacji nie można cofnąć!
							</SecondaryText>
						</Column>
					</Row>
				</Panel>
				<Calendar.Board/>
			</Calendar>
		</div>
	)
}

export default Schedule;