import React, { FC, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../App/Context';
import { AUTH_TOKEN, USER } from '../../constants';

const Logout: FC = () => {
	const context = useContext(Context);
	
	useEffect(() => {
		localStorage.removeItem(AUTH_TOKEN);
		localStorage.removeItem(USER);
		context.update({ token: null, user: null });
	}, [context]);

	return (
		<Redirect to="/"/>
	)
}

export default Logout;