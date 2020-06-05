import { gql } from 'apollo-boost';
import { UserFragment, ProjectFragment } from './fragments';

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
	mutation StartTimeRecordingMutation($projectId: ID!) {
		startWorkTimeRecord(projectId: $projectId) {
			from
		}
	}
`;
export const StopTimeRecordingMutation = gql`
	mutation StopTimeRecordingMutation {
		stopWorkTimeRecord {
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
	mutation CreateUserMutation($email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: Role!, $isActive: Boolean!) {
		signup(
			email: $email,
			password: $password,
			first_name: $first_name,
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
		$id: ID!,
		$email: String,
		$first_name: String,
		$last_name: String,
		$role: Role,
		$isActive: Boolean) {
			updateUser(
				id: $id,
				email: $email,
				first_name: $first_name,
				last_name: $last_name,
				role: $role,
				isActive: $isActive) {
					...UserFragment
			}
	}
	${UserFragment}
`;

export const PatchProjectMutation = gql`
	mutation PatchProjectMutation($id: ID!, $name: String, $description: String, $isClosed: Boolean) {
		updateProject(id: $id, name: $name, description: $description, isClosed: $isClosed) {
			...ProjectFragment
		}
	}
	${ProjectFragment}
`;

export const EmployeeSettlementMutation = gql`
	mutation EmployeeSettlementMutation($id: ID!) {
		updateMonthStatus(id: $id, status: AWAITING) {
			id, status
		}
	}
`;

export const ManagerSettlementMutation = gql`
	mutation ManagerSettlementMutation($id: ID!, $status: Status!) {
		updateMonthStatus(id: $id, status: $status) {
			id, status
		}
	}
`;