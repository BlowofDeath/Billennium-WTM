import React, { FC, useState } from 'react';
import { FormControl, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledForm = styled(FormControl)({
	zIndex: 101,
	background: "#fff",
	padding: "40px",
	"& > *": {
		marginBottom: "20px"
	}
})

const UserCreateForm: FC = () => {
	const [role, setRole] = useState("Pracownik");
	
	const _handleRoleChange = function(e: any) {
		setRole(e.target.value);
	}
	
	return (
		<StyledForm onClick={(e) => { e.stopPropagation() }}>
			<h2>Dodawanie użytkownika</h2>
			<TextField type="email" label="email" />
			<TextField type="password" label="hasło" />
			<TextField type="text" label="imię"/>
			<TextField type="text" label="nazwisko"/>
			<Select
				value={role}
				onChange={_handleRoleChange}>
				<MenuItem value="Pracownik">Pracownik</MenuItem>
				<MenuItem value="Kierownik">Kierownik</MenuItem>
				<MenuItem value="Admin">Admin</MenuItem>
			</Select>
			<Button variant="outlined" color="primary">Dodaj</Button>
		</StyledForm>
	)
}

export default UserCreateForm;