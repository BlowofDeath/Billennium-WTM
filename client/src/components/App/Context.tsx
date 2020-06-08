import { createContext } from 'react';
import { User } from '../../core/User';
import { Task } from '../../core/Task';

export interface ContextType {
	token: 				string | null,
	user: 				User | null,
	task: 				Task | null,
	isSidebarVisible: 	boolean,
	update: 			(state: object, callback?: () => void) => void
}

export const defaultContextValue = {
	token: 				null,
	user: 				null,
	task: 				null,
	isSidebarVisible: 	true,
	update: 			function() {}
}

export const Context = createContext<ContextType>(defaultContextValue);