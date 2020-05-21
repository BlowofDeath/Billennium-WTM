import React, { StatelessComponent, Fragment, useContext } from 'react';
import { FaHome, FaCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import {
	List,
	ListItem
} from '@material-ui/core';
import { IconType } from 'react-icons/lib/cjs';
import { Context, ContextType } from '../App/Context';
import UserBadge from '../UserBadge/UserBadge';

interface MenuItem {
	name: string,
	to: string,
	Icon?: IconType,
	if?: (context: ContextType) => boolean
}

const items: Array<MenuItem> = [
	{
		name: "Home",
		to: '/',
		Icon: FaHome
	},
	{
		name: "Projekty",
		to: "/projects",
		if: (context: ContextType) => context.user?.role === 'Kierownik',
		Icon: AiOutlineBarChart
	},
	{
		name: 'Grafik',
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
	const context = useContext(Context);
	const history = useHistory();

	if (!context.user)
		return <div>Loading...</div>

	return (
		<Fragment>
			<UserBadge user={context.user}/>
			<List component="nav">
				{
					items.map((item: MenuItem, index: number) => {
						if (item.if && !item.if(context))
							return null;
						
						return <ListItem key={index} button onClick={() => { history.push(item.to) }}>
							{ item.Icon && <item.Icon style={{marginRight: "5px"}}/> }
							{ item.name }
						</ListItem>
					})
				}
			</List>
		</Fragment>
	)
}

export default Navigation;