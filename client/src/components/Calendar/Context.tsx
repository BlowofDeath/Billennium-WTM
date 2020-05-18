import { createContext, ReactNode } from "react";

export interface Event {
	/** Title of the event */
	title: string,
	/** Event description if given */
	description?: string,
	/** Event date */
	date: number
}

export interface RenderableEvent {
	/** Optional custom render method */
	render?: () => ReactNode,
	date: number
}

export interface Events {
	[key: number]: Array<Event | RenderableEvent>
}

export interface CalendarContext {
	/** Date type - Defines which day should be marked - Date.now() by default */
	mark: number,
	/** Date type - Defines which month should be displayed - Date.now() by default */
	visibleMonth: number,
	/** Events that should be put on specific date */
	events: Events,
	/** Updater function */
	update: (state: object) => void
}

export const defaultContextValue: CalendarContext = {
	mark: 			Date.now(),
	visibleMonth: 	Date.now(),
	events: 		[],
	update: 		function() {}
}

export const Context = createContext<CalendarContext>(defaultContextValue);