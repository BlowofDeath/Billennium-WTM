import { createContext } from 'react';
import { User } from '../../core/User';
import { Project } from '../../core/Project';

export interface ContextType {
	token: 				string | null,
	user: 				User | null,
	task: 				Project | null,
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