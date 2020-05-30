import { gql } from 'apollo-boost';
import { UserFragment } from './fragments';

export const loginMutation = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token,
			user {
				...UserFragment
			}
		}
	}
	${UserFragment}
`;

export const StartTimeRecordingMutation = gql`
	mutation StartTimeRecordingMutation($token: String!, $projectId: ID!) {
		startWorkTimeRecord(token: $token, projectId: $projectId) {
			from
		}
	}
`;
export const StopTimeRecordingMutation = gql`
	mutation StopTimeRecordingMutation($token: String!) {
		stopWorkTimeRecord(token: $token) {
			from, to, day
		}
	}
`;

export const CreateProjectMutation = gql`
	mutation CreateProjectMutation($name: String!, $description: String!) {
		addProject(name: $name, description: $description) {
			name, description
		}
	}
`;

export const CreateUserMutation = gql`
	mutation CreateUserMutation($email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $salary: Int!, $isActive: Boolean!) {
		signup(
			email: $email,
			password: $password,
			first_name: $first_name,
			salary: $salary,
			last_name: $last_name,
			role: $role,
			isActive: $isActive
		) {
			user {
				...UserFragment
			}
		}
	}
	${UserFragment}
`;

export const PatchUserMutation = gql`
	mutation PatchUserMutation(
		$token: String!,
		$id: ID!,
		$email: String,
		$first_name: String,
		$last_name: String,
		$salary: Float,
		$role: String,
		$isActive: Boolean) {
			updateUser(
				token: $token,
				id: $id,
				email: $email,
				first_name: $first_name,
				last_name: $last_name,
				role: $role,
				salary: $salary,
				isActive: $isActive) {
					...UserFragment
			}
	}
	${UserFragment}
`;

export const EmployeeSettlementMutation = gql`
	mutation EmployeeSettlementMutation($id: ID!) {
		updateMonthStatus(id: $id, status: AWAITING) {
			id, status
		}
	}
`;