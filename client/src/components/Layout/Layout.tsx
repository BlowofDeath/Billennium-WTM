import React, { ReactNode, FC, useContext, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import { Sidebar, Container, StyledAppBar, ContentContainer } from './Atoms';
import LoginPage from '../LoginPage/LoginPage';
import Drawer from '../Drawer';
import Page from '../Page/Page';
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
						<Drawer>
							<Sidebar>
								{ sidenav }
							</Sidebar>
						</Drawer>

						<ContentContainer>
							<StyledAppBar position="absolute">
								<FiMenu size={30}/>
								AppBar
							</StyledAppBar>
							<Page>
								{ main }
							</Page>
						</ContentContainer>
					</Container>
				</Route>
			</Fragment>
			}
		</BrowserRouter>
	)
}

export default Layout;