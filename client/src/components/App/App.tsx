import { ApolloProvider } from '@apollo/react-hooks';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import React, { Component } from 'react';
import { AUTH_TOKEN, TASK, USER } from '../../constants';
import defaultTheme from '../../themes/default';
import Layout from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import Router from '../Router/Router';
import './App.sass';
import { Context, defaultContextValue } from './Context';
import moment from 'moment';
import 'moment/locale/pl';
import { ApolloLink } from 'apollo-link';


moment.locale('pl');

const ENV = process.env.NODE_ENV;
const PORT = ENV === 'development' ? 4000 : 80;
const { hostname } = window.location;

const httpLink = createHttpLink({
	uri: `https://${hostname}:${PORT}`
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
		console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
	);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);

	if (ENV === 'development') {
		console.log(`OP: ${_?.operationName}`)
		console.log(`REQUEST: %s`, token)
	}

	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : ""
		}
	}
})

const link = ApolloLink.from([
	authLink, errorLink, httpLink
])

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
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
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<ThemeProvider theme={defaultTheme}>
							<div className="App">
								<Layout 
									main={<Router />}
									sidenav={<Navigation />}/>
							</div>
						</ThemeProvider>
					</MuiPickersUtilsProvider>
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
