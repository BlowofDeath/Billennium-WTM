import React, { FC, useState, SyntheticEvent } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { validatePassword } from './validate';

interface PasswordFieldProps {
	minimum?: number,
	maximum?: number,
	helpText?: {
		tooShort: 	string,
		tooLong: 	string
	},
	propName?: string,
	onPassword?: (password: string | null) => void,
	initialValue?: string
}

const PasswordField: FC<PasswordFieldProps & TextFieldProps> = ({
	minimum=8,
	maximum=20,
	helpText={
		tooShort: "is too short!",
		tooLong:  "is too long!"
	},
	onPassword=function(){},
	propName="Password",
	initialValue="",
	...props
}) => {
	const [password, setPassword] 	= useState<string>(initialValue);
	const [error, setError] 		= useState<string | null>(null);
	
	const _handlePasswordChange = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let value = ((event as SyntheticEvent<HTMLInputElement>).target as HTMLInputElement).value;
		let validate = validatePassword(value, minimum, maximum, helpText?.tooShort, helpText?.tooLong, propName);
		setPassword(value);
		
		// Validation error
		if (validate?.[propName].length > 0) {
			setError(validate[propName][0]);
			onPassword("");
		}
		else {
			setError("");
			onPassword(value);
		}
	}

	return (
		<TextField
			type="password"
			value={password}
			error={error ? true : false}
			helperText={error}
			onChange={_handlePasswordChange}
			{...props}/>
	)
}

export default PasswordField;