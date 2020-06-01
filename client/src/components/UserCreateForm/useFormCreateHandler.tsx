import { FormData } from './UserCreateForm';
import { useMutation } from '@apollo/react-hooks';
import { CreateUserMutation } from '../../graphql/mutations';
import { useState, useEffect } from 'react';

export const useFormCreateHandler = () => {
	const [loading, setLoading] = useState(false);
	const [signup, { data, error, called }] = useMutation(CreateUserMutation);

	useEffect(() => {
		if (called && !data && !error)
			setLoading(true);
	}, [data, called, error])

	return {
		signup: (formData: FormData) => {
			signup({ variables: formData });
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		data, error, loading
	}
}