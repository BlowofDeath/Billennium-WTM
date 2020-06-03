import { useMutation } from "@apollo/react-hooks"
import { PatchProjectMutation } from "../../graphql/mutations";
import { Project } from "../../core/Project";
import { useState, useEffect } from "react";

type ProjectUpdateHandlerType = [(original: Project, project: { name?: string, description?: string }) => void, { loading: boolean, data: any, error: any }];

export const useProjectUpdateHandler = (): ProjectUpdateHandlerType => {
	const [update, result] = useMutation(PatchProjectMutation);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		if (!result.loading) {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [result.loading]);

	return [
		(original: Project, project: { name?: string, description?: string }) => {
			setLoading(true);
			let diff: Partial<Project> = {};

			['name', 'description'].forEach((key: string) => {
				let k = key as 'name' | 'description';

				if (original[k] !== project[k]) {
					diff[k] = project[k];
					
				}
			})

			update({ variables: { ...diff, id: original.id } });
		},
		{
			loading,
			data: result.data,
			error: result.error
		}
	]
}