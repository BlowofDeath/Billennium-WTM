import React, { StatelessComponent, Fragment } from 'react';
import { FaHome, FaCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
	List,
	ListItem
} from '@material-ui/core';
import { IconType } from 'react-icons/lib/cjs';

interface MenuItem {
	name: string,
	to: string,
	Icon?: IconType
}

const items: Array<MenuItem> = [
	{
		name: "Home",
		to: '/',
		Icon: FaHome
	},
	{
		name: 'Schedule',
		to: '/schedule',
		Icon: FaCalendarAlt
	},
	{
		name: "Logout",
		to: '/logout',
		Icon: FiLogOut
	}
]

const Navigation: StatelessComponent = () => {
	const history = useHistory();

	return (
		<Fragment>
			<List component="nav">
				{
					items.map((item: MenuItem, index) => (
						<ListItem key={index} button onClick={() => { history.push(item.to) }}>
							{ item.Icon && <item.Icon style={{marginRight: "5px"}}/> }
							{ item.name }
						</ListItem>
					))
				}
			</List>
		</Fragment>
	)
}

export default Navigation;