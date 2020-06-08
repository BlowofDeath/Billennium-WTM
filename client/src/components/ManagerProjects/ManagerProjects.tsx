import React, { FC, useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../graphql/queries';
import { FaPlus } from 'react-icons/fa';
import Panel from '../Panel/Panel';
import moment from 'moment';
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
import { Row } from '../Atoms/Row';
import { CustomExpansionPanel } from '../Atoms/CustomExpansionPanel';

const ManagerProjects: FC = () => {
	const now = moment();
	const [isBackdropOpen, toggleBackdrop] = useReducer((state) => !state, false);
	const { data, loading, error, refetch } = useQuery(ManagerProjectsQuery);
	const [onProjectCreate, creationResult] = useProjectCreationHandler();
	const { close, ...closeProjectResult } = useProjectCloser();
	const activeProjects = data?.projects.filter((project: Project) => !project.isClosed);
	const closedProjects = data?.projects.filter((project: Project) => project.isClosed);

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

			<Panel>
				<Row>
					<Column>
						<h2>Projekty</h2>
						<SecondaryText>
							Zestawienie łączne przepracowanych godzin dla poszczególnych projektów
						</SecondaryText>
					</Column>
					<Column>
						<Row>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => { generujpdf(data.projects, now.month() + 1, now.year()) }}>
									Raport
							</Button>
							<Button
								variant="contained"
								color="primary"
								startIcon={<FaPlus/>}
								onClick={toggleBackdrop}>
							Dodaj 
							</Button>
						</Row>
					</Column>
				</Row>
				
			</Panel>

			<CustomExpansionPanel
				header={<h3>Aktywne projekty - { activeProjects.length }</h3>}
				aria-controls="panel1a-content"
				id="panel1a-header">
				<ProjectList
					projects={activeProjects}
					projectPostpendRender={(project: Project) => (
						<Column style={{ paddingLeft: 30 }}>
							<Button variant="outlined" color="primary" onClick={() => { close(project.id) }}>
								Archiwizuj
							</Button>
							<SecondaryText>Nie może zostać cofnięte!</SecondaryText>
						</Column>
					)}/>
			</CustomExpansionPanel>

			<CustomExpansionPanel
				header={<h3>Zarchiwizowane projekty - { closedProjects.length }</h3>}
				aria-controls="panel1b-content"
				id="panel1b-header">
				
				<ProjectList projects={closedProjects}/>
			</CustomExpansionPanel>
		</div>
	)
}

export default ManagerProjects;