import { gql } from 'apollo-boost';

export const loginMutation = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token,
			user {
				email,
				first_name,
				last_name
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
			from, to
		}
	}
`;