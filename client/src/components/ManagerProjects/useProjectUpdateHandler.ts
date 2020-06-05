import { useMutation } from "@apollo/react-hooks"
import { PatchProjectMutation } from "../../graphql/mutations";
import { Project } from "../../core/Project";
import { useState, useEffect } from "react";

type ProjectUpdateHandlerType = [(original: Project, project: { name?: string, description?: string, isPinned?: boolean }) => void, { loading: boolean, data: any, error: any }];

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
		(original: Project, project: { name?: string, description?: string, isPinned?: boolean }) => {
			setLoading(true);
			let diff: any = {};

			['name', 'description', 'isPinned'].forEach((key: string) => {
				let k = key as 'name' | 'description' | 'isPinned';

				if (original[k] !== project[k]) {
					diff[k] = project[k];
					
				}
			})
			console.log({ diff })
			update({ variables: { ...diff, id: original.id } });
		},
		{
			loading,
			data: result.data,
			error: result.error
		}
	]
}