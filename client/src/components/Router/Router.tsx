import React, { StatelessComponent, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../Schedule/Schedule';
import Projects from '../Projects/Projects';
import Logout from '../Logout/Logout';
import { Context } from '../App/Context';

const Home = () => <h3>Home</h3>;

const Router: StatelessComponent = () => {
	const { user, token } = useContext(Context);

	return (
		<Switch>
			{ user?.role === "Pracownik" && token && <Route path="/" exact component={Projects}/> }
			{ user?.role === "Kierownik" && token && <Route path="/" exact component={Home}/> }

			{  user?.role === "Kierownik" && token && <Route path="/projects" exact component={Projects}/> }

			<Route path="/schedule" exact component={Schedule}/>
			<Route path="/logout" exact component={Logout}/>
		</Switch>
	)
}

export default Router;