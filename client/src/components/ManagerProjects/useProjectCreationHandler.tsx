import { useMutation } from "@apollo/react-hooks";
import { CreateProjectMutation } from "../../graphql/mutations";
import { useState, useEffect } from "react";

type CreateProjectHandlerType = () => [(name: string, description: string, isPinned: boolean) => void, {
	loading: 	boolean,
	data: 		any,
	error: 		any
}]

export const useProjectCreationHandler: CreateProjectHandlerType = () => {
	const [loading, setLoading] = useState(false);
	const [create, { data, error, called }] = useMutation(CreateProjectMutation);

	useEffect(() => {
		if (!data && !error && called) {
			setLoading(true);
		}
	}, [data, error, called])

	return [
		(name: string, description: string, isPinned: boolean) => {
			create({ variables: { name, description, isPinned }});
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		{
			data, loading, error
		}
	]
}