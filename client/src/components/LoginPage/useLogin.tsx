import { useMutation } from "@apollo/react-hooks";
import { loginMutation } from "../../graphql/mutations";

const useLogin = () => {
	const [login, { data, loading, error }] = useMutation(loginMutation, { errorPolicy: "all", onError: () => {} });
	
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
