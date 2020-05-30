import React, { FC, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../App/Context';
import { AUTH_TOKEN, USER, TASK } from '../../constants';
import { useMutation } from '@apollo/react-hooks';
import { StopTimeRecordingMutation } from '../../graphql/mutations';

const Logout: FC = () => {
	const { token } = useContext(Context);
	const [stop] = useMutation(StopTimeRecordingMutation);
	const context = useContext(Context);
	
	useEffect(() => {
		localStorage.removeItem(AUTH_TOKEN);
		localStorage.removeItem(USER);

		if (localStorage.getItem(TASK)) {
			stop({ variables: { token }});
			localStorage.removeItem(TASK);
		}
		context.update({ token: null, user: null, task: null });
	}, [context, stop, token]);

	return (
		<Redirect to="/"/>
	)
}

export default Logout;