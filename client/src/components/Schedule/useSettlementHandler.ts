import { useMutation } from "@apollo/react-hooks"
import { EmployeeSettlementMutation } from "../../graphql/mutations";

export const useSettlementHandler = () => {
	const [changeStatus, { data, loading, error }] = useMutation(EmployeeSettlementMutation);

	return {
		closeMonth: (id: string) => {
			changeStatus({ variables: { id }});
		},
		data, loading, error
	}
}