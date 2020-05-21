import { gql } from 'apollo-boost';

export const UserScheduleQuery = gql`
	query UserScheduleQuery($year: Int!, $month: Int!, $token: String!) {
		month(year: $year, month: $month, token: $token) {
			workTimeRecords {
				from,
				to,
				day
			}
		}
	}
`;

export const UserProjectsQuery = gql`
	query UserProjectsQuery {
		projects {
			name,
			description,
			id
		}
	}
`;