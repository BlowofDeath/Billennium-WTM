import React, { ReactNode, Component } from 'react';
import { Context, defaultContextValue } from './Context';
import Main from './Main';
import MonthSwitch from './MonthSwitch';
import DayLabel from './DayLabel';

interface IProps {
	children: ReactNode | Array<ReactNode> | JSX.Element | Array<JSX.Element> | string | null,
	/** Mark specific day - by default current day */
	mark?: number,
	/** Specify which month should be displayed - by default current month */
	visableMonth?: number
}

class Calendar extends Component<IProps> {
	static Main = Main;
	static MonthSwitch = MonthSwitch;
	static DayLabel = DayLabel;

	state = {
		...defaultContextValue,
		mark: this.props.mark ?? defaultContextValue.mark,
		visableMonth: this.props.visableMonth ?? defaultContextValue.visableMonth
	}
	
	render(): ReactNode {
		const { children } = this.props;
		
		return (
			<Context.Provider value={{ ...this.state, update: (state) => { this.setState({ ...state }) } }}>
				{ children }
			</Context.Provider>
		)
	}
}


export default Calendar;