import React, { FC, useReducer, useEffect } from 'react';
import { StyledProjectItem, StyledProjectDescription, StyledProjectInfo } from './Atoms';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../graphql/queries';
import { FaPlus } from 'react-icons/fa';
import Panel from '../Panel/Panel';
import { Button, Backdrop } from '@material-ui/core';
import ProjectCreationForm from '../ProjectCreationForm/ProjectCreationForm';
import { useProjectCreationHandler } from './useProjectCreationHandler';
import Loader from '../Loader/Loader';
import { generujpdf } from '../../scripts/generatorPDF';
import { aggregateWTRs } from '../../scripts/aggregateWTRs';

const ManagerProjects: FC = () => {
	const [isBackdropOpen, toggleBackdrop] = useReducer((state) => !state, false);
	const { data, loading, error, refetch } = useQuery(ManagerProjectsQuery);
	const [onProjectCreate, creationResult] = useProjectCreationHandler();

	useEffect(() => {
		if (!creationResult.data) {
			refetch();
		}
			
	}, [creationResult.data, refetch]);

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
			{
				 data.projects.map((project: any, index: number) => {
					project.id = parseInt(project.id);
					let time = aggregateWTRs(project.workTimeRecords ?? []);

					return (
						<StyledProjectItem key={project.id}>
							<StyledProjectInfo>
								<span>{ project.name }</span>
								<StyledProjectDescription>
									{ project.description }
								</StyledProjectDescription>
							</StyledProjectInfo>
							<div>
								<div>Łączny czas pracy</div>
								<StyledProjectDescription>
									{ Math.floor(time / 60) }h { time % 60 }min
								</StyledProjectDescription>
							</div>
						</StyledProjectItem>
					)
				})
			}
			</Panel>
		</div>
	)
}

export default ManagerProjects;