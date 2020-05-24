import React, { FC, useState, SyntheticEvent } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { validateEmail } from './validate';

interface EmailFieldProps {
	/** Event that triggers when valid email has been provided */
	onEmail: (email: string | null) => void,
	/** Helper text that should be displayed when invalid email has been provided */
	helperText: string | null
}

const EmailField: FC<EmailFieldProps & TextFieldProps> = ({ onEmail, helperText, ...props }) => {
	const [email, setEmail] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const _handleChange = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let value: string = (event as SyntheticEvent<HTMLInputElement>).currentTarget.value;
		let validation = validateEmail(value);

		setEmail(value);

		if (validation?.email.length > 0) {
			setError(validation?.email[0]);
			onEmail(null);
		}
		else {
			onEmail(value);
			setError(null);
		}
	}

	return (
		<TextField
			error={error ? true : false}
			helperText={error ? helperText : undefined}
			type="email"
			onChange={_handleChange}
			{ ...props }/>
	)
}

EmailField.defaultProps = {
	onEmail: 	function() {},
	helperText: "Invalid email adress format!"
}

export default EmailField;