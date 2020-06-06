import { FormData } from './UserCreateForm';
import { useMutation } from '@apollo/react-hooks';
import { CreateUserMutation } from '../../graphql/mutations';
import { useState, useEffect } from 'react';

export const useFormCreateHandler = () => {
	const [loading, setLoading] = useState(false);
	const [create, { ...result }] = useMutation(CreateUserMutation);

	useEffect(() => {
		if (result.data || result.error) {
			setTimeout(() => {
				setLoading(true);
			}, 700);
		}
	}, [result])

	return {
		signup: (formData: FormData) => {
			setLoading(true);
			create({ variables: formData });
		},
		data: result.data,
		error: result.error,
		loading,
		called: result.called
	}
}