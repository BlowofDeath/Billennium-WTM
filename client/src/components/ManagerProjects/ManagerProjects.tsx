import React, { FC, useReducer, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../graphql/queries';
import { FaPlus } from 'react-icons/fa';
import Panel from '../Panel/Panel';
import moment from 'moment';
import { Button, Backdrop } from '@material-ui/core';
import ProjectCreationForm from '../ProjectCreationForm/ProjectCreationForm';
import { generujpdf } from '../../scripts/generatorPDF';
import ProjectList from '../ProjectList/ProjectList';
import { Project } from '../../core/Project';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Column } from '../Atoms/Column';
import { useProjectCloser } from './useProjectCloser';
import { Row } from '../Atoms/Row';
import { CustomExpansionPanel } from '../Atoms/CustomExpansionPanel';
import { useApolloErrorHandler } from '../../hoc/useApolloErrorHandler';

const ManagerProjects: FC = () => {
	const now = moment();
	const [editProjectData, setEditProjectData] = useState<Project | null>(null);
	const [isBackdropOpen, toggleBackdrop] = useReducer((state) => !state, false);
	const { handleError } = useApolloErrorHandler();
	const { data, loading, error, refetch } = useQuery(ManagerProjectsQuery);
	
	const { close, ...closeProjectResult } = useProjectCloser();
	const activeProjects = data?.projects.filter((project: Project) => !project.isClosed && !project.isPinned);
	const closedProjects = data?.projects.filter((project: Project) => project.isClosed);
	const sideProjects = data?.projects.filter((project: Project) => project.isPinned && !project.isClosed);

	console.log(data?.projects)

	const _handleCreateOrUpdate = (data: any, error: any, loading: boolean) => {
		if (!loading && (data || error)) {
			toggleBackdrop();
			setEditProjectData(null);
			refetch();
		}
	}

	useEffect(() => {
		if (error)
			handleError(error);
		if (closeProjectResult.error)
			handleError(closeProjectResult.error);
	}, [error, closeProjectResult.error])

	if (loading)
		return <span>Loading...</span>;
	if (error)
		return <span>Error...</span>;

	return (
		<div>
			<Backdrop open={isBackdropOpen} onClick={toggleBackdrop} style={{ zIndex: 2000 }}>
				<ProjectCreationForm
					data={editProjectData}
					onCreate={_handleCreateOrUpdate}
					onUpdate={_handleCreateOrUpdate}/>
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
								onClick={() => {
									toggleBackdrop();
									setEditProjectData(null); 
								}}>
							Dodaj 
							</Button>
						</Row>
					</Column>
				</Row>
				
			</Panel>

			<Panel>
				<h3>Aktywne projekty - { activeProjects.length }</h3>
				<ProjectList
					projects={activeProjects}
					projectPostpendRender={(project: Project) => (
						<Column style={{ paddingLeft: 30 }}>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									setEditProjectData(project);
									toggleBackdrop();
								}}>
								Edytuj
							</Button>
							<Button variant="outlined" color="primary" onClick={() => { close(project.id) }}>
								Archiwizuj
							</Button>
							<SecondaryText>Nie może zostać cofnięte!</SecondaryText>
						</Column>
					)}/>
			</Panel>

			<Panel>
				<h3>Zadania poboczne - { sideProjects.length }</h3>
				<ProjectList
					projects={sideProjects}
					projectPostpendRender={(project: Project) => (
						<Column style={{ paddingLeft: 30 }}>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									setEditProjectData(project);
									toggleBackdrop();
								}}>
								Edytuj
							</Button>
							<Button variant="outlined" color="primary" onClick={() => { close(project.id) }}>
								Archiwizuj
							</Button>
							<SecondaryText>Nie może zostać cofnięte!</SecondaryText>
						</Column>
					)}/>
			</Panel>

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