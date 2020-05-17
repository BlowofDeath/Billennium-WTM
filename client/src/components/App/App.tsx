import React, { FunctionComponent } from 'react';
import './App.sass';
import Layout from '../Layout/Layout';
import Router from '../Router/Router';
import Navigation from '../Navigation/Navigation';

const App: FunctionComponent = () => {
	return (
		<div className="App">
			<Layout 
				main={<Router />}
				sidenav={<Navigation />}/>
		</div>
	)
}

export default App;
