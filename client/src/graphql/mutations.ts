import { gql } from 'apollo-boost';

export const loginMutation = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token,
			user {
				email,
				first_name,
				last_name,
				role
			}
		}
	}
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
	mutation CreateUserMutation($email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!) {
		signup(
			email: $email, password: $password, first_name: $first_name, last_name: $last_name, role: $role
		) {
			user {
				first_name, last_name, role
			}
		}
	}
`;