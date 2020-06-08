import { ApolloError } from "apollo-boost";
import { useToasts } from "react-toast-notifications";
import { mapError } from "../scripts/errorMap";

export const useApolloErrorHandler = () => {
	const { addToast } = useToasts();
	
	return {
		handleError: (error: ApolloError | undefined) => {
			if (!error)
				return;

			if (error?.graphQLErrors.length > 0) {
				error?.graphQLErrors.forEach((err: any) => {
					addToast(mapError(err.message), {
						appearance: "error"
					});
				})
			}
			else {
				addToast("Wystąpił nieznany błąd!", {
					appearance: "error"
				});
			}
		}
	}
}