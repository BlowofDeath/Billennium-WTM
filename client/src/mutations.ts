import { gql } from 'apollo-boost';

export const loginMutation = gql`
	query LoginMutation {
		allUsers(last: 1) {
			id, name
		}
	}
`;