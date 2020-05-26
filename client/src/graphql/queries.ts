import { gql } from 'apollo-boost';

export const UserScheduleQuery = gql`
	query UserScheduleQuery($year: Int!, $month: Int!, $token: String!) {
		month(year: $year, month: $month, token: $token) {
			workTimeRecords {
				from,
				to,
				day,
				project {
					name
				}
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

export const ManagerProjectsQuery = gql`
	query ManagerProjectsQuery {
		projects {
			name, description, id,
			workTimeRecords {
				from, to
			}
		}
	}
`;

export const AdminUsersQuery = gql`
	query AdminUsersQuery {
		users {
			first_name,
			last_name,
			email,
			id,
			role
		}
	}
`;