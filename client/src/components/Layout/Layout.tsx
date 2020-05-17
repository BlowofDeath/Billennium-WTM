import React, { ReactNode, FC } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid, Hidden } from '@material-ui/core';
import { Sidebar, Container } from './Atoms';

interface IProps {
	/** Menu component that displays at the side */
	sidenav?: 	ReactNode,
	/** Component that handles view switches */
	main?: 		ReactNode
}

// Mock login page
const Login = () => <h2>Login</h2>;

/** Layout component */
const Layout: FC<IProps> = ({ sidenav, main }) => {
	const token = 'mockToken';
	const isAuthenticated = typeof token === 'string' && token !== null;
	
	return (
		<BrowserRouter>
			<Route path="/login" exact component={Login}/>
			{ !isAuthenticated && <Redirect to="/login"/> }
			{ isAuthenticated && <Container container alignItems="stretch" alignContent="stretch">
				<Hidden smDown>
					<Grid item md={3} lg={2} xl={2}>
						<Sidebar>
							{ sidenav }
						</Sidebar>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
					{ main }
				</Grid>
			</Container>
			}
		</BrowserRouter>
	)
}

export default Layout;