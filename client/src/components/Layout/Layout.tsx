import React, { ReactNode, FC, useContext, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid, Hidden } from '@material-ui/core';
import { Sidebar, Container } from './Atoms';
import LoginPage from '../LoginPage/LoginPage';
import { useToken } from '../../hooks/useToken';
import { AUTH_TOKEN } from '../../constants';
import { Context } from '../App/Context';

interface IProps {
	/** Menu component that displays at the side */
	sidenav?: 	ReactNode,
	/** Component that handles view switches */
	main?: 		ReactNode
}

/** Layout component */
const Layout: FC<IProps> = ({ sidenav, main }) => {
	const { token } = useContext(Context);
	const isAuthenticated = typeof token === 'string' && token !== null;

	return (
		<BrowserRouter>
			{ !isAuthenticated && <Fragment>
				<Route path="/login" exact component={LoginPage}/>
				<Redirect to="/login"/>
			</Fragment>
			}
			{ isAuthenticated && <Fragment>
				<Route to="/">
					<Container container alignItems="stretch" alignContent="stretch">
						<Hidden smDown>
							<Grid item md={3} lg={2} xl={2}>
								<Sidebar>
									{ sidenav }
								</Sidebar>
							</Grid>
						</Hidden>
						<Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
							<div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
								{ main }
							</div>
						</Grid>
					</Container>
				</Route>
			</Fragment>
			}
		</BrowserRouter>
	)
}

export default Layout;