import React, { FC } from 'react';
import { StyledProjectContainer, StyledProjectItem, StyledProjectDescription, StyledProjectInfo } from './Atoms';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { ManagerProjectsQuery } from '../../graphql/queries';

interface WorkTimeHour {
	from: string,
	to: string
}

/** Aggregate time returns work time in minutes */
const aggregateTime = (workTimeHours: Array<WorkTimeHour>) => {
	let sum = 0;

	for (let i = 0; i < workTimeHours.length; i++) {
		let to = parseInt(workTimeHours[i].to);
		let from = parseInt(workTimeHours[i].from);
		
		if (!workTimeHours[i].to)
			continue;
	
		sum += moment(to).diff(moment(from), "minutes");
	}
	return sum;
}

const ManagerProjects: FC = () => {
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
								<div>Łączny czas pracy</div>
								<StyledProjectDescription>
									{ Math.floor(time / 60) }h { time % 60 }min
								</StyledProjectDescription>
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