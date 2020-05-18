import React, { StatelessComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import { Events } from '../Calendar/Context';

// Mock component
const Cmp: StatelessComponent = () => <h1>Component</h1>;

const events: Events = {
	[Date.now()]: [
		{
			render: () => (<h2>My Event</h2>),
			date: Date.now()
		}
	]
}

const Router: StatelessComponent = () => {
	return (
		<Switch>
			<Route path="/" exact component={Cmp}/>
			<Route path="/schedule" exact render={() => {
				return (
				<Calendar events={events}>
					<Calendar.MonthSwitch />
					<Calendar.DayLabel />
					<Calendar.Main />
				</Calendar>
			)}}/>
		</Switch>
	)
}

export default Router;