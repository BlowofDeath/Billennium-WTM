import { gql } from 'apollo-boost';
import { UserFragment, ProjectFragment } from './fragments';

export const UserScheduleQuery = gql`
	query UserScheduleQuery($year: Int!, $month: Int!, $token: String!) {
		month(year: $year, month: $month, token: $token) {
			id,
			status,
			workTimeRecords {
				from,
				to,
				day,
				project {
					...ProjectFragment
				}
			}
		}
	}
	${ProjectFragment}
`;

export const UserProjectsQuery = gql`
	query UserProjectsQuery {
		projects(isClosed: false) {
			...ProjectFragment
		}
	}
	${ProjectFragment}
`;

export const ManagerProjectsQuery = gql`
	query ManagerProjectsQuery {
		projects {
			...ProjectFragment,
			workTimeRecords {
				from, to
			}
		}
	}
	${ProjectFragment}
`;

export const ManagerSettlementsQuery = gql`
	query ManagerSettlementsQuery($token: String!, $year: Int!, $month: Int!) {
		monthForAllUsers(token: $token, year: $year, month: $month) {
			id, month, year, status,
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