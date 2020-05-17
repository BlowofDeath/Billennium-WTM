import React, { StatelessComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';

// Mock component
const Cmp: StatelessComponent = () => <h1>Component</h1>;

const Router: StatelessComponent = () => {
	return (
		<Switch>
			<Route path="/" exact component={Cmp}/>
			<Route path="/schedule" exact render={(renderProps) => (
				<Calendar>
					<Calendar.MonthSwitch />
					<Calendar.DayLabel />
					<Calendar.Main />
				</Calendar>
			)}/>
		</Switch>
	)
}

export default Router;