import { useMutation } from "@apollo/react-hooks";
import { loginMutation } from "../../mutations";

const useLogin = (callback?: (response: any, err: any) => void) => {
	const [login, { data, loading, error }] = useMutation(loginMutation);
	
	if (callback && !error && !loading && data) {
		callback(data, error);
	}

	const _login = function(email: string, password: string) {
		login({
			variables: {
				email,
				password
			}
		});
	}

	return { 
		login: _login,
		data, loading, error
	}
}

export { useLogin };
