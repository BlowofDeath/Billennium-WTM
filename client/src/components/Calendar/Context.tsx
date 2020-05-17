import { createContext } from "react";

export interface CalendarContext {
	/** Date type - Defines which day should be marked - Date.now() by default */
	mark: number,
	/** Date type - Defines which month should be displayed - Date.now() by default */
	visableMonth: number,
	/** Updater function */
	update: (state: object) => void
}

export const defaultContextValue: CalendarContext = {
	mark: 			Date.now(),
	visableMonth: 	Date.now(),
	update: 		function() {}
}

export const Context = createContext<CalendarContext>(defaultContextValue);