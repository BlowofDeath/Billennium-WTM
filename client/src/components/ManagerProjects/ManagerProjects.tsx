import React, { FC, useContext } from 'react';
import { StyledProjectContainer, StyledProjectItem, StyledProjectDescription, StyledProjectInfo } from './Atoms';
import { Context } from '../App/Context';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../queries';

interface WorkTimeHour {
	from: number,
	to: number
}

const aggregateTime = (workTimeHours: Array<WorkTimeHour>) => {
	let sum = 0;
	console.log(workTimeHours)
	for (let i = 0; i < workTimeHours.length; i++) {
		sum += (workTimeHours[i].to - workTimeHours[i].from);
	}
	return sum;
}

const ManagerProjects: FC = () => {
	const { token, task, update } = useContext(Context);
	const { data, loading, error } = useQuery(ManagerProjectsQuery);

	if (loading)
		return <span>Loading...</span>;
	if (error)
		return <span>Error...</span>;

	return (
		<div>
			<h2>Projects</h2>
			
			<StyledProjectContainer>
			{
				 data.projects.map((project: any, index: number) => {
					project.id = parseInt(project.id);
					let time = aggregateTime(project.workTimeRecords ?? []);

					return (
						<StyledProjectItem key={project.id}>
							<StyledProjectInfo>
								<span>{ project.name }</span>
								<StyledProjectDescription>
									{ project.description }
								</StyledProjectDescription>
							</StyledProjectInfo>
							<div>
								{ Math.floor(time / 3600000) }h { (time / 60000).toFixed(0) }min
							</div>
						</StyledProjectItem>
					)
				})
			}
			</StyledProjectContainer>
		</div>
	)
}

export default ManagerProjects;