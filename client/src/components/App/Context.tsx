import { createContext } from 'react';

export interface IUser {
	email: string,
	role: string,
	first_name: string,
	last_name: string
}

export interface ITask {
	name: string,
	index: number
}

export interface ContextType {
	token: 	string | null,
	user: 	IUser | null,
	task: 	ITask | null,
	update: (state: object) => void
}

export const defaultContextValue = {
	token: 	null,
	user: 	null,
	task: 	null,
	update: function() {}
}

export const Context = createContext<ContextType>(defaultContextValue);