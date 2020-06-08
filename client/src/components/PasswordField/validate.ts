import validate from 'validate.js';

export const validatePassword = (password: string | null, minimum: number, maximum: number, tooShort: string, tooLong: string, propName: string) => {
	return validate({ [propName]: password }, {
		[propName]: {
			length: {
				minimum,
				maximum,
				tooShort,
				tooLong
			}
		}
	})
}