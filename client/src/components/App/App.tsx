import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.sass';
import Layout from '../Layout/Layout';
import Router from '../Router/Router';
import Navigation from '../Navigation/Navigation';
import { Context, defaultContextValue } from './Context';
import ApolloClient from 'apollo-boost';
import { AUTH_TOKEN, USER, TASK } from '../../constants';

const client = new ApolloClient({
	uri: 'http://192.168.1.101:4000'
})

class App extends Component {
	state = {
		...defaultContextValue
	}

	render() {
		return (
			<Context.Provider value={{ ...this.state, update: (state) => { this.setState({ ...state }) }}}>
				<ApolloProvider client={client}>
					<div className="App">
						<Layout 
							main={<Router />}
							sidenav={<Navigation />}/>
					</div>
				</ApolloProvider>
			</Context.Provider>
		)
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
