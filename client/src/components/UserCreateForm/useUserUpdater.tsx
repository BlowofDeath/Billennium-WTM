import { useMutation } from "@apollo/react-hooks"
import { PatchUserMutation } from "../../graphql/mutations";
import { User } from "../../core/User";

export const useUserUpdater = () => {
	const [update, { data, loading, error }] = useMutation(PatchUserMutation, { errorPolicy: 'all', onError: () => {} });

	return {
		update: (original: User, user: User, token: string) => {
			let diff: { [key: string]: any } = {
				id: original.id
			}

			if (Object.keys(user).length === 0)
				return;

			Object.keys(original).forEach((property: string) => {
				let keyOfUser = property as keyof User;

				if (original[keyOfUser] !== user[keyOfUser]) {
					diff[property] = user[keyOfUser];
				}
			})
			console.log(diff)
			update({ variables: { ...diff, token } });
		}, data, loading, error
	}
}