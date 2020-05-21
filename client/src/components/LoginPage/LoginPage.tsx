import React, { FC, useState, useEffect, SyntheticEvent, useContext } from 'react';
import validate from 'validate.js';
import { useMutation } from '@apollo/react-hooks';
import { TextField, InputAdornment, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { StyledLoginPage, StyledLoginForm, StyledFormHeader, StyledButton } from './Atoms';
import { useHistory } from 'react-router-dom';
import { FiMail, FiKey } from 'react-icons/fi'
import { loginMutation } from '../../mutations';
import { AUTH_TOKEN, USER } from '../../constants';
import { Context } from '../App/Context';

const textFieldStyles = {
	width: "100%",
	marginBottom: "30px"
}

const LoginPage: FC = () => {
	const context = useContext(Context);
	const history = useHistory();
	const [login, { error }] = useMutation(loginMutation);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	useEffect(() => {
		// Validate email
		let errors = validate({ Email: email }, { Email: { email: true }});
		if (errors?.Email.length > 0)
			setEmailError("Email jest niepoprawny!");
		else
			setEmailError(null);
	}, [email]);

	useEffect(() => {
		// validate password
		let errors = validate({ "Hasło": password }, { "Hasło": {
			length: {
				minimum: 8,
				maximum: 20,
				tooShort: "jest zbyt krótkie!",
				tooLong: "jest zbyt długie!"
			}
		}})
		if (errors?.["Hasło"].length > 0)
			setPasswordError(errors?.["Hasło"][0]);
		else
			setPasswordError(null);
	}, [password]);

	const _confirm = (e: SyntheticEvent<HTMLFormElement>) => {
		if (emailError || passwordError)
			return;
		e.preventDefault();
		setLoading(true);
		
		login({ variables: { email, password }})
		.then(({ data: { login }}: any) => {
			setTimeout(() => {
				setLoading(false);
				localStorage.setItem(AUTH_TOKEN, login.token);
				localStorage.setItem(USER, JSON.stringify({ ...login.user }));
				history.push('/');
				context.update({ token: login.token, user: { ...login.user } });
			}, 2000);
		})
		.catch(err => {
			setTimeout(() => {
				setLoading(false);
				console.log('LOGIN ERROR', { err })
			}, 2000);
		});
	}

	return (
		<StyledLoginPage>
			<StyledLoginForm onSubmit={_confirm}>
				<Snackbar open={!loading && error ? true : false} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
					<Alert elevation={6} variant="filled" severity="error">
						Nie ma takiego użytkownika!
					</Alert>
				</Snackbar>

				<Backdrop open={loading} style={{ zIndex: 1000, background: "#00000055", position: "absolute", left: "0", top: "0" }}>
					<CircularProgress variant="indeterminate"/>
				</Backdrop>
				<div style={{ flex: 1, flexDirection: "column" }}>
					<StyledFormHeader>Login</StyledFormHeader>
					<TextField
						error={(emailError ? true : false)}
						helperText={emailError}
						onChange={(event) => { setEmail(event.target.value) }}
						type="email"
						label="Email" style={{ ...textFieldStyles }}
						InputProps={{ startAdornment: (
							<InputAdornment position="start">
								<FiMail size={20}/>
							</InputAdornment>
						) }}/>
					<TextField
						error={(passwordError ? true : false)}
						helperText={passwordError}
						onChange={(event) => { setPassword(event.target.value) }}
						label="Hasło"
						type="password"
						style={{ ...textFieldStyles }}
						InputProps={{ startAdornment: (
						<InputAdornment position="start">
							<FiKey size={20}/>
						</InputAdornment>
					) }}/>
				</div>

				<StyledButton variant="contained" color="primary" type="submit">Login!</StyledButton>
			</StyledLoginForm>
		</StyledLoginPage>
	)
}

export default LoginPage;