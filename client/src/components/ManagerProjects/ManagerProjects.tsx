import React, { FC, useReducer, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../graphql/queries';
import { FaPlus } from 'react-icons/fa';
import Panel from '../Panel/Panel';
import { Button, Backdrop } from '@material-ui/core';
import ProjectCreationForm from '../ProjectCreationForm/ProjectCreationForm';
import { useProjectCreationHandler } from './useProjectCreationHandler';
import Loader from '../Loader/Loader';
import { generujpdf } from '../../scripts/generatorPDF';
import ProjectList from '../ProjectList/ProjectList';
import { Project } from '../../core/Project';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Column } from '../Atoms/Column';
import { useProjectCloser } from './useProjectCloser';

const ManagerProjects: FC = () => {
	const [isBackdropOpen, toggleBackdrop] = useReducer((state) => !state, false);
	const { data, loading, error, refetch } = useQuery(ManagerProjectsQuery);
	const [onProjectCreate, creationResult] = useProjectCreationHandler();
	const { close, ...closeProjectResult } = useProjectCloser();

	useEffect(() => {
		if (!creationResult.data) {
			refetch();
		}
	}, [creationResult.data, refetch, closeProjectResult.data]);

	if (loading)
		return <span>Loading...</span>;
	if (error)
		return <span>Error...</span>;

	return (
		<div>
			<Backdrop open={isBackdropOpen} onClick={toggleBackdrop} style={{ zIndex: 2000 }}>
				<ProjectCreationForm onSubmit={onProjectCreate}/>
				<Loader loading={creationResult.loading}/>
			</Backdrop>

			<h2>Projekty</h2>
			<Panel>
				<Button
					variant="contained"
					color="primary"
					startIcon={<FaPlus/>}
					onClick={toggleBackdrop}>
					Dodaj 
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={() => { generujpdf(data.projects, 5, 2020) }}>
						Raport
				</Button>
			</Panel>
			<Panel>
				<h3>Aktywne projekty</h3>
				<ProjectList
					projects={data.projects.filter((project: Project) => !project.isClosed)}
					projectPostpendRender={(project: Project) => (
						<Column style={{ paddingLeft: 30 }}>
							<Button variant="outlined" color="primary" onClick={() => { close(project.id) }}>
								Archiwizuj
							</Button>
							<SecondaryText>Nie może zostać cofnięte!</SecondaryText>
						</Column>
					)}/>
			</Panel>
			<Panel>
				<h3>Zarchiwizowane projekty</h3>
				<ProjectList projects={data.projects.filter((project: Project) => project.isClosed)}/>
			</Panel>
		</div>
	)
}

export default ManagerProjects;