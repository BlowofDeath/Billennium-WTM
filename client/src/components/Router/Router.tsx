import React, { StatelessComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../Schedule/Schedule';

// Mock component
const Cmp: StatelessComponent = () => <h1>Component</h1>;

const Router: StatelessComponent = () => {
	return (
		<Switch>
			<Route path="/" exact component={Cmp}/>
			<Route path="/schedule" exact component={Schedule}/>
		</Switch>
	)
}

export default Router;