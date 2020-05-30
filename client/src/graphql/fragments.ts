import { gql } from "apollo-boost";

export const UserFragment = gql`
	fragment UserFragment on User {
		id,
		first_name,
		last_name,
		role,
		email,
		salary,
		isActive
	}
`;

export const ProjectFragment = gql`
	fragment ProjectFragment on Project {
		id,
		name,
		description,
		isClosed
	}
`;