import { useState } from 'react';

export function useToken(key: string) {
	const [token, setToken] = useState(localStorage.getItem(key));

	const remove = () => {
		localStorage.removeItem(key);
	}

	const save = (token: string) => {
		localStorage.setItem(key, token);
		setToken(token);
	}

	return {
		token,
		remove,
		save
	}
}