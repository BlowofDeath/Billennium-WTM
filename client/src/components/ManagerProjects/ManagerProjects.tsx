import React, { FC, useReducer, useEffect, useState } from 'react';
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
import { useProjectUpdateHandler } from './useProjectUpdateHandler';

const ManagerProjects: FC = () => {
	const now = moment();
	const [editProjectData, setEditProjectData] = useState<Project | null>(null);
	const [isBackdropOpen, toggleBackdrop] = useReducer((state) => !state, false);
	const { data, loading, error, refetch } = useQuery(ManagerProjectsQuery);
	
	const { close, ...closeProjectResult } = useProjectCloser();
	const activeProjects = data?.projects.filter((project: Project) => !project.isClosed);
	const closedProjects = data?.projects.filter((project: Project) => project.isClosed);

	useEffect(() => {
		if (closeProjectResult.data) {
			refetch();
		}
	}, [refetch, closeProjectResult.data]);

	const _handleCreateOrUpdate = (data: any, error: any, loading: boolean) => {
		if (!loading && (data || error)) {
			toggleBackdrop();
			setEditProjectData(null);
			refetch();
		}
	}

	if (loading)
		return <span>Loading...</span>;
	if (error)
		return <span>Error...</span>;

	return (
		<div>
			<Backdrop open={isBackdropOpen} onClick={toggleBackdrop} style={{ zIndex: 2000 }}>
				{/* Removing this condition will cause recursive call!!! Do not remove */}
				{ isBackdropOpen && <ProjectCreationForm
					data={editProjectData}
					onCreate={_handleCreateOrUpdate}
					onUpdate={_handleCreateOrUpdate}/>
				}
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

			<CustomExpansionPanel
				header={<h3>Aktywne projekty - { activeProjects.length }</h3>}
				aria-controls="panel1a-content"
				id="panel1a-header">
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