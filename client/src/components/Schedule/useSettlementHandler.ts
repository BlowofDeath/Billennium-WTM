import { useMutation } from "@apollo/react-hooks"
import { EmployeeSettlementMutation } from "../../graphql/mutations";
import { useToasts } from "react-toast-notifications";
import { useApolloErrorHandler } from '../../hoc/useApolloErrorHandler';
import { useEffect } from "react";

export const useSettlementHandler = () => {
	const [changeStatus, { data, loading, error }] = useMutation(EmployeeSettlementMutation, { onError: () => {}, errorPolicy: 'all' });
	const { handleError } = useApolloErrorHandler();
	const { addToast } = useToasts();

	useEffect(() => {
		if (error) {
			handleError(error);
		}
	}, [error]);

	return {
		closeMonth: (id: string) => {
			if (!id) {
				addToast("Nie można rozliczyć nierozpoczętego miesiąca!", {
					appearance: "error"
				})
				return;
			}
			changeStatus({ variables: { id }});
		},
		data, loading, error
	}
}