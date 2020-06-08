import { gql } from "apollo-boost";

export const ReportPerPersonQuery = gql`
	query ReportPerPersonQuery($month: Int!, $year: Int!) {
		users {
			id,
			role,
			first_name,
			last_name,
			projects {
				wtrsPerMonth(month: $month, year: $year) {
					from, to
				}
			}
		}
	}
`;