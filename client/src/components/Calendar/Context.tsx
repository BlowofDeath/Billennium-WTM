import { createContext, ReactNode } from "react";
import moment from 'moment';

export interface CalendarEvent {
	/** Title of the event */
	title: string,
	/** Event description if given */
	description?: string,
	/** Event date */
	date: number
}

export interface CalendarRenderableEvent {
	/** Optional custom render method */
	render: (index: number, date: number) => ReactNode,
	date: number
}

export function isRenderableEvent(event: CalendarEvent | CalendarRenderableEvent): event is CalendarRenderableEvent {
	return (event as CalendarRenderableEvent).render !== undefined;
}

export interface CalendarContext {
	/** Date type - Defines which day should be marked - Date.now() by default */
	mark: number,
	/**  */
	year: number,
	/** Date type - Defines which month should be displayed - Date.now() by default */
	month: number,
	/** Events that should be put on specific date */
	events: Array<CalendarRenderableEvent | CalendarEvent>,
	/**  */
	timeline: boolean,
	/** Updater function */
	update: (state: object) => void
}

export const defaultContextValue: CalendarContext = {
	mark: 			Date.now(),
	year: 			moment().year(),
	month: 			moment().month(),
	events: 		[],
	timeline: 		false,
	update: 		function() {}
}

export const Context = createContext<CalendarContext>(defaultContextValue);