import { useMutation } from "@apollo/react-hooks"
import { PatchUserMutation } from "../../graphql/mutations";
import { User } from "../../core/User";
import { useEffect, useState } from "react";

export const useUserUpdater = () => {
	const [loading, setLoading] = useState(false);
	const [update, { ...result }] = useMutation(PatchUserMutation, { errorPolicy: 'all', onError: () => {} });

	useEffect(() => {
		if (result.data || result.error) {
			setTimeout(() => {
				setLoading(false);
			}, 600);
		}
	}, [result])

	return {
		update: (original: User, user: User, token: string) => {
			setLoading(true);
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
			update({ variables: { ...diff, token } });
		},
		loading,
		data: result.data,
		error: result.error,
		called: result.called
	}
}