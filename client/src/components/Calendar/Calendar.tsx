import React, { ReactNode, Component } from 'react';
import { Context, defaultContextValue, CalendarRenderableEvent, CalendarEvent } from './Context';
import Main from './Main';
import MonthSwitch from './MonthSwitch';
import DayLabel from './DayLabel';

interface IProps {
	children: ReactNode | Array<ReactNode> | JSX.Element | Array<JSX.Element> | string | null,
	/** Mark specific day - by default current day */
	mark?: number,
	/**  */
	year?: number,
	/** Specify which month should be displayed - by default current month */
	month?: number,
	/** Specifies events on calendar */
	events: Array<CalendarEvent | CalendarRenderableEvent>,
	/** Event that fires when month is beeing changed */
	onMonthChange: (year: number, month: number) => void
}
interface IState {
	mark: number,
	year: number,
	month: number,
	events: Array<CalendarEvent | CalendarRenderableEvent>
}

class Calendar extends Component<IProps, IState> {
	static Main = Main;
	static MonthSwitch = MonthSwitch;
	static DayLabel = DayLabel;

	state: IState = {
		mark: this.props.mark ?? defaultContextValue.mark,
		year: this.props.year ?? defaultContextValue.year,
		month: this.props.month ?? defaultContextValue.month,
		events: this.props.events ?? defaultContextValue.events
	}
	
	render(): ReactNode {
		const { children } = this.props;
		
		return (
			<Context.Provider value={{ ...this.state, update: (state) => { this.setState({ ...state }) } }}>
				{ children }
			</Context.Provider>
		)
	}

	componentDidUpdate(prevProps: IProps, prevState: IState) {
		if (prevState.month !== this.state.month || prevState.year !== this.state.year) {
			this.props.onMonthChange(this.state.year, this.state.month);
		}
	}

	static defaultProps = {
		onMonthChange: function() {},
		events: []
	}
}

export default Calendar;