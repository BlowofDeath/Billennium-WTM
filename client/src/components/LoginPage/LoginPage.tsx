import React, { FC, useState, useEffect, SyntheticEvent, useContext } from 'react';
import { InputAdornment, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { StyledLoginPage, StyledLoginForm, StyledFormHeader, StyledButton } from './Atoms';
import { useHistory } from 'react-router-dom';
import { FiMail, FiKey } from 'react-icons/fi'
import { AUTH_TOKEN, USER } from '../../constants';
import { Context } from '../App/Context';
import EmailField from '../EmailField';
import PasswordField from '../PasswordField/PasswordField';
import { useLogin } from './useLogin';
import Loader from '../Loader/Loader';

const textFieldStyles = {
	width: "100%",
	marginBottom: "30px"
}

const LoginPage: FC = () => {
	const context = useContext(Context);
	const history = useHistory();
	const [email, setEmail] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const { login, data, loading, error } = useLogin();

	useEffect(() => {
		let mounted = true;
		if (data === undefined || context?.user)
			return;

		if (mounted) {
			localStorage.setItem(AUTH_TOKEN, data.login.token);
			localStorage.setItem(USER, JSON.stringify({ ...data.login.user }));
			context.update({ token: data.login.token, user: { ...data.login.user } });
			history.push('/');
		}

		return () => { mounted = false };
	}, [data, context, history]);

	useEffect(() => {
		console.log(error);
	}, [error]);

	const _confirm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email || !password)
			return;
		
		login(email, password);
	}

	return (
		<StyledLoginPage>
			<StyledLoginForm onSubmit={_confirm}>
				<Snackbar open={!loading && error ? true : false} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
					<Alert elevation={6} variant="filled" severity="error">
						Nie ma takiego użytkownika!
					</Alert>
				</Snackbar>

				<Loader loading={loading}/>

				<div style={{ flex: 1, flexDirection: "column" }}>
					<StyledFormHeader>Login</StyledFormHeader>
					
					<EmailField
						label="Email"
						style={{ ...textFieldStyles }}
						onEmail={(email: string | null) => { setEmail(email) }}
						helperText="Nieprawidlowy adres email!"
						InputProps={{ startAdornment: (
							<InputAdornment position="start">
								<FiMail size={20}/>
							</InputAdornment>
						) }}/>
					
					<PasswordField
						onPassword={(password: string | null) => { setPassword(password) }}
						helpText={{
							tooShort: "jest za krótkie!",
							tooLong: "jest za długie!"
						}}
						label="Hasło"
						propName="Hasło"
						type="password"
						style={{ ...textFieldStyles }}
						InputProps={{ startAdornment: (
							<InputAdornment position="start">
								<FiKey size={20}/>
							</InputAdornment>) }}
						/>
				</div>

				<StyledButton variant="contained" color="primary" type="submit">Login!</StyledButton>
			</StyledLoginForm>
		</StyledLoginPage>
	)
}

export default LoginPage;