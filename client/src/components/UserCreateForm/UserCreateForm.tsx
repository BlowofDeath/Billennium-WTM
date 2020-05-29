import React, { FC, useState, useEffect } from 'react';
import { FormControl, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import EmailField from '../EmailField/EmailField';
import PasswordField from '../PasswordField/PasswordField';
import { useFormCreateHandler } from './useFormCreateHandler';
import Loader from '../Loader/Loader';

const StyledForm = styled('form')({
	position: "relative",
	zIndex: 101,
	background: "#fff",
	padding: "40px",
	"& > *": {
		marginBottom: "20px"
	}
})

export interface FormData {
	role: 		"Pracownik" | "Kierownik" | "Admin",
	email: 		string,
	password: 	string,
	first_name: string,
	last_name: 	string
}

export interface UserCreateFormProps {
	/** */
	userData?: FormData,
	/** */
	onCreateUser?: (data: FormData, error: any) => void,
	/** */
	label?: {
		edit: 		string,
		create: 	string
	},
	/** */
	buttonText?: {
		edit: 		string,
		create: 	string
	}
}

/** UserCreateForm */
const UserCreateForm: FC<UserCreateFormProps> = ({
	onCreateUser=function(){},
	label={
		edit: 	"Update user",
		create: "Create new user"
	},
	buttonText={
		edit: 	"Update",
		create: "Create"
	},
	userData
}) => {
	const { signup, data, error, loading } = useFormCreateHandler();
	const [formData, setFormData] = useState<FormData>(userData ?? {
		role: 		"Pracownik",
		email: 		"",
		password: 	"",
		first_name: "",
		last_name: 	""
	});
	
	const _handleConfirm = () => {
		// use update handler
		if (userData) {
			return;
		}
		// use create handler
		if (!formData.email || !formData.password || !formData.first_name || !formData.last_name || !formData.role)
			return;

		signup(formData);
	}

	useEffect(() => {
		if (userData)
			setFormData(userData);
	}, [userData]);

	useEffect(() => {
		onCreateUser(data, error);
	}, [data, error]);
	
	return (
		<StyledForm onClick={(e) => { e.stopPropagation() }} onSubmit={_handleConfirm}>
			<Loader loading={loading}/>
			<FormControl>
				<h2>{ userData ? label.edit : label.create }</h2>
				<EmailField
					helperText="Nieprawidłowy adres email"
					label="email"
					onEmail={(email: string | null) => { setFormData({ ...formData, email: email ? email : "" }) }}/>
				
				<PasswordField
					required={userData ? false : true }
					label="hasło"
					onPassword={(password: string | null) => { setFormData({ ...formData, password: password ? password : "" }) }}/>

				<TextField
					value={formData.first_name}
					required
					type="text"
					label="imię"
					onChange={(e) => { setFormData({ ...formData, first_name: e.target.value.trim() }) }}/>

				<TextField
					value={formData.last_name}
					required
					type="text"
					label="nazwisko"
					onChange={(e) => { setFormData({ ...formData, last_name: e.target.value.trim() }) }}/>

				<Select
					value={formData.role}
					onChange={(e) => { setFormData({ ...formData, role: (e.target.value as "Kierownik" | "Pracownik" | "Admin") }); }}>
					<MenuItem value="Pracownik">Pracownik</MenuItem>
					<MenuItem value="Kierownik">Kierownik</MenuItem>
					<MenuItem value="Admin">Admin</MenuItem>
				</Select>
				<Button type="submit" variant="outlined" color="primary">{ userData ? buttonText.edit : buttonText.create }</Button>
			</FormControl>
		</StyledForm>
	)
}

export default UserCreateForm;