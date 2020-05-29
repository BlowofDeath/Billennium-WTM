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

const Projects: FC = () => {
	const { token, task, update } = useContext(Context);
	const { data, loading, error } = useQuery(UserProjectsQuery);
	
	const [start, startResult] = useMutation(StartTimeRecordingMutation);
	const [stop, stopResult] = useMutation(StopTimeRecordingMutation);

	const _handleProjectClick = (project: { name: string, description: string }, index: number) => {
		if (task === null) {
			start({
				variables: {
					token,
					projectId: index
				}
			})
			update({ task: { name: project.name, index } });
		}
		else if (task?.index === index) {
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
				 data.projects.map((project: any, index: number) => {
					project.id = parseInt(project.id);
					let inactive = task && (task.index !== project.id) ? "true" : undefined;
					let stop = task && (task.index === project.id) ? "true" : undefined;

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
									onClick={() => { _handleProjectClick(project, project.id) } }
									variant="outlined"
									startIcon={(project.id === task?.index) ? <BsStop /> : <BsPlay size={20} />}>
									{ task?.index === project.id ? <span>Stop</span> : <span>Start</span> }
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