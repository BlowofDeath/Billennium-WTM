import { useMutation } from "@apollo/react-hooks"
import { PatchProjectMutation } from "../../graphql/mutations"

export const useProjectCloser = () => {
	const [close, { data, error, loading }] = useMutation(PatchProjectMutation);

	return {
		close: (id: string) => {
			close({ variables: { id, isClosed: true }});
		},
		data, error, loading
	}
}