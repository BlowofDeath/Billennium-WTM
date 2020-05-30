import React, { FC, Fragment, ReactNode } from 'react'
import { Project } from '../../core/Project';
import { aggregateWTRs } from '../../scripts/aggregateWTRs';
import { StyledListItem } from '../Atoms/StyledListItem';
import { Column } from '../Atoms/Column';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Row } from '../Atoms/Row';

export interface ProjectListProps {
	/** */
	projects: Array<Project>;
	/** */
	projectPostpendRender?: (project: Project) => ReactNode | ReactNode[];
}

const ProjectList: FC<ProjectListProps> = ({ projects, projectPostpendRender }) => {
	return (
		<Column style={{ width: "100%" }}>
			{
				projects.map((project: Project, index: number) => {
					let time = aggregateWTRs(project.workTimeRecords ?? []);

					return (
						<StyledListItem key={project.id}>
							<Column>
								<span>{ project.name }</span>
								<SecondaryText>
									{ project.description }
								</SecondaryText>
							</Column>
							<Row justifyContent="flex-end">
								<Column>
									<div>Łączny czas pracy</div>
									<SecondaryText>
										{ Math.floor(time / 60) }h { time % 60 }min
									</SecondaryText>
								</Column>
								{ projectPostpendRender && <Fragment>
										{ projectPostpendRender(project) }
									</Fragment>
								}
							</Row>
						</StyledListItem>
					)
				})
			}
		</Column>
	)
}

export default ProjectList;