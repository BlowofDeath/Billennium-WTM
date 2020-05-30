import { useMutation } from "@apollo/react-hooks"
import { ManagerSettlementMutation } from "../../graphql/mutations";

export const useMonthStatusHandler = () => {
	const [changeStatus, { data, loading, error }] = useMutation(ManagerSettlementMutation);

	return {
		changeMonthStatus: (id: string, status: 'OPEN' | 'CLOSED') => {
			console.log({ id, status })
			changeStatus({ variables: { id, status }});
		},
		data, loading, error
	}
}