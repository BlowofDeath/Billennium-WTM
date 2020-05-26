import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.sass';
import Layout from '../Layout/Layout';
import Router from '../Router/Router';
import Navigation from '../Navigation/Navigation';
import { Context, defaultContextValue } from './Context';
import ApolloClient from 'apollo-boost';
import { AUTH_TOKEN, USER, TASK } from '../../constants';
import { ThemeProvider } from '@material-ui/styles';

import defaultTheme from '../../themes/default';
// import darkTheme from '../../themes/dark';

const client = new ApolloClient({
	uri: 'http://192.168.1.101:4000'
})

class App extends Component {
	/**
	 *
	 */
	constructor(props: any) {
		super(props);
		this._update = this._update.bind(this);
	}
	
	state = {
		...defaultContextValue
	}

	render() {
		return (
			<Context.Provider value={{ ...this.state, update: this._update }}>
				<ApolloProvider client={client}>
					<ThemeProvider theme={defaultTheme}>
						<div className="App">
							<Layout 
								main={<Router />}
								sidenav={<Navigation />}/>
						</div>
					</ThemeProvider>
				</ApolloProvider>
			</Context.Provider>
		)
	}

	_update(state: any) {
		this.setState({ ...state }, () => {
			console.log(this.state);
		});
	}

	static getDerivedStateFromProps(props: any, state: any) {
		const token = localStorage.getItem(AUTH_TOKEN);
		const user = JSON.parse(localStorage.getItem(USER) as string);
		const task = JSON.parse(localStorage.getItem(TASK) as string);
		
		if (!state.token && token) {
			return { token, user, task };
		}
		else return null;
	}
}

export default App;
