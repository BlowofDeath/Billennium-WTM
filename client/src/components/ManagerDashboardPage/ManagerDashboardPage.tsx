import React, { Fragment, FC } from 'react';
import moment from 'moment';
import { FlexGroup, StyledSquareBlock, StatSecondaryText, StatNumber } from './Atoms';
import { useQuery } from '@apollo/react-hooks';
import { ManagerProjectsQuery } from '../../graphql/queries';

const ManagerDashboardPage: FC = () => {
	const projectsQuery = useQuery(ManagerProjectsQuery);

	return (
		<Fragment>
			<h2>Dashboard</h2>
			<FlexGroup>
				<StyledSquareBlock flex={2}>
					{ projectsQuery.data && <Fragment>
							<h4>Projekty</h4>
							<StatSecondaryText>Liczba prowadzonych aktywnych projektów</StatSecondaryText><br/>
							<StatNumber>{ projectsQuery.data.projects.length }</StatNumber>
						</Fragment>
					}
				</StyledSquareBlock>
				<StyledSquareBlock flex={2}>
					Stat 1
				</StyledSquareBlock>
				<StyledSquareBlock flex={1}>
					<h4>Dziś</h4>
					<StatNumber>
						{ moment().format("MMM") }<br/>
					</StatNumber>
					<StatNumber size={2.5}>
						{ moment().format("YYYY") }<br/>
					</StatNumber>
					<StatNumber size={2}>
						{ moment().format("ddd") }
					</StatNumber>
				</StyledSquareBlock>
			</FlexGroup>
		</Fragment>
	)
}

export default ManagerDashboardPage;