import React, { FC, useContext, useEffect } from 'react';
import { BsPlay, BsStop } from 'react-icons/bs';
import { StyledButton } from './Atoms';
import { Context } from '../App/Context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UserProjectsQuery } from '../../graphql/queries';
import { StartTimeRecordingMutation, StopTimeRecordingMutation } from '../../graphql/mutations';
import { TASK } from '../../constants';
import Panel from '../Panel';
import { StyledListItem } from '../Atoms/StyledListItem';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Column } from '../Atoms/Column';
import { Project } from '../../core/Project';

const Projects: FC = () => {
	const { token, task, update } = useContext(Context);
	const { data, loading, error } = useQuery(UserProjectsQuery);
	
	const [start, startResult] = useMutation(StartTimeRecordingMutation);
	const [stop, stopResult] = useMutation(StopTimeRecordingMutation);

	const _handleProjectClick = (project: Project) => {
		if (task === null) {
			start({
				variables: {
					token,
					projectId: project.id
				}
			})
			update({ task: project });
		}
		else if (task?.id === project.id) {
			stop({
				variables: { token }
			})
			update({ task: null });
		}
	}

	useEffect(() => {
		if (startResult.data)
			localStorage.setItem(TASK, JSON.stringify(task));
	}, [startResult.data, task]);

	useEffect(() => {
		if (stopResult.data)
			localStorage.removeItem(TASK);
	}, [stopResult.data]);

	if (loading)
		return <span>Loading...</span>;
	if (error)
		return <span>Error...</span>;

	return (
		<div>
			<h3>Projects</h3>
			
			<Panel>
			{
				 data.projects.map((project: Project) => {
					let inactive = task && (task.id !== project.id) ? "true" : undefined;
					let stop = task && (task.id === project.id) ? "true" : undefined;

					return (
						<StyledListItem key={project.id}>
							<Column>
								<span>{ project.name }</span>
								<SecondaryText>
									{ project.description }
								</SecondaryText>
							</Column>
							<div>
								<StyledButton
									inactive={ inactive }
									stop={ stop }
									onClick={() => { _handleProjectClick(project) } }
									variant="outlined"
									startIcon={(project.id === task?.id) ? <BsStop /> : <BsPlay size={20} />}>
									{ task?.id === project.id ? <span>Stop</span> : <span>Start</span> }
								</StyledButton>
							</div>
						</StyledListItem>
					)
				})
			}
			</Panel>
		</div>
	)
}

export default Projects;