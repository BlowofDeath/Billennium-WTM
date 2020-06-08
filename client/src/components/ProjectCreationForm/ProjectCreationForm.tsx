import React, { FC, useState } from 'react';
import { styled, TextField, FormControl, Button } from '@material-ui/core';

const StyledForm = styled('form')({
	zIndex: 101,
	background: "#fff",
	padding: "40px",
	"& > *": {
		marginBottom: "20px",
		width: "400px"
	}
})

interface ProjectCreationFormProps {
	onSubmit: (name: string, description: string) => void
}

const ProjectCreationForm: FC<ProjectCreationFormProps> = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	return (
		<StyledForm onSubmit={() => { onSubmit(name, description) }} onClick={(e) => { e.stopPropagation() }}>
			<FormControl>
				<h2>Dodawanie projektu</h2>
				<TextField
					required
					value={name}
					type="text"
					label="nazwa"
					onChange={(event) => { setName(event.target.value) }}/>
				<TextField
					required
					value={description}
					type="text"
					label="opis"
					multiline
					rows={7}
					onChange={(event) => { setDescription(event.target.value) }}/>
				<Button
					variant="outlined"
					color="primary"
					type="submit">
						Dodaj
				</Button>
			</FormControl>
		</StyledForm>
	)
}

ProjectCreationForm.defaultProps = {
	onSubmit: function() {}
}

export default ProjectCreationForm;