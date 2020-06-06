import React, { FC, Fragment, ReactNode } from 'react'
import { Project } from '../../core/Project';
import { aggregateWTRs } from '../../scripts/aggregateWTRs';
import { StyledListItem } from '../Atoms/StyledListItem';
import { Column } from '../Atoms/Column';
import { SecondaryText } from '../Atoms/SecondaryText';
import { Row } from '../Atoms/Row';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { ProjectListRow, ProjectListColumn } from './Atoms';

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
							<ProjectListColumn>
								<span>{ project.name }</span>
								<SecondaryText>
									{ project.description }
								</SecondaryText>
							</ProjectListColumn>
							<ProjectListRow justifyContent="flex-end">
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
							</ProjectListRow>
						</StyledListItem>
					)
				})
			}
		</Column>
	)
}

export default ProjectList;