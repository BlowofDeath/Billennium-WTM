import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { styled, TextField, FormControl, Button, FormControlLabel, Switch } from '@material-ui/core';
import { Project } from '../../core/Project';
import { useProjectUpdateHandler } from '../ManagerProjects/useProjectUpdateHandler';
import { useProjectCreationHandler } from '../ManagerProjects/useProjectCreationHandler';
import Loader from '../Loader/Loader';

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
	onCreate: (data: any, error: any, loading: boolean) => void;
	onUpdate: (data: any, error: any, loading: boolean) => void;
	data?: Project | null;
}

const ProjectCreationForm: FC<ProjectCreationFormProps> = ({ onCreate, onUpdate, data }) => {
	const [onProjectCreate, createResult] = useProjectCreationHandler();
	const [onProjectUpdate, updateResult] = useProjectUpdateHandler();
	const [name, setName] = useState(data ? data.name : "");
	const [description, setDescription] = useState(data ? data.description : "");
	const [isPinned, setIsPinned] = useState(false);

	useEffect(() => {
		if (data) {
			setName(data.name);
			setDescription(data.description);
		}
		else {
			setName("");
			setDescription("");
		}
	}, [data]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			onUpdate(updateResult.data, updateResult.error, updateResult.loading)
		}
		return () => { mounted = false };
	}, [updateResult?.data, updateResult?.error, updateResult?.loading]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			onCreate(createResult?.data, createResult?.error, createResult?.loading);
		}
		return () => { mounted = false };
	}, [createResult?.data, createResult?.error, createResult?.loading])

	const _onSubmitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		
		if (data) {
			onProjectUpdate(data, { name, description, isPinned });
		}
		else {
			onProjectCreate(name, description, isPinned);
		}
	}

	return (
		<>
			<Loader loading={createResult.loading || updateResult.loading}/>
			<StyledForm onSubmit={_onSubmitHandler} onClick={(e) => { e.stopPropagation() }}>
				<FormControl>
					<h2>{ data ? `Edycja projektu` : `Dodawanie projektu` }</h2>
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
					<FormControlLabel
						label={isPinned ? "Inne zajęcia" : "Projekt"}
						control={
							<Switch
								checked={isPinned}
								onChange={() => { setIsPinned(!isPinned) }}/>
						}/>
					<Button
						variant="outlined"
						color="primary"
						type="submit">
							{ data ? `Edytuj` : `Dodaj` }
					</Button>
				</FormControl>
			</StyledForm>
		</>
	)
}

ProjectCreationForm.defaultProps = {
	onCreate: function() {},
	onUpdate: function() {}
}

export default ProjectCreationForm;