const map: {[key: string]: string} = {
	"User not found": 		"Użytkownik nie istnieje",
	"Wrong email adress": 	"Nieprawidłowy adres email",
	"Password incorrect": 	"Nieprawidłowe hasło",
	"Incorrect token": 		"Niepoprawny token autoryzacyjny!",
	"User isn't active": 	"Użytkownik jest nieaktywny!",
	"Email already used": 	"Użytkownik o takim adresie email już istnieje!"
}

export const mapError = (error: string) => {
	return map[error] ? map[error] : "Nieznany błąd";
}