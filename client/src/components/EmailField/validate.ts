import validate from 'validate.js';

export const validateEmail = (email: string) => {
	return validate({ email }, { email: { email: true } });
}