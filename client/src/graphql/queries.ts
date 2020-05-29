import { gql } from 'apollo-boost';
import { UserFragment } from './fragments';

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

export const ManagerSettlementsQuery = gql`
	query ManagerSettlementsQuery($token: String!, $year: Int!, $month: Int!) {
		monthForAllUsers(token: $token, year: $year, month: $month) {
			month, year, isClosed,
			user {
				...UserFragment
			},
			workTimeRecords {
				from,
				to
			}
		}
		
	}
	${UserFragment}
`;

export const AdminUsersQuery = gql`
	query AdminUsersQuery {
		users {
			...UserFragment
		}
	}
	${UserFragment}
`;