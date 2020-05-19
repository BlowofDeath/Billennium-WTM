import styled from 'styled-components';

export const StyledWeek = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-between;
`;

export const StyledDay = styled.li`
	transition: background 200ms ease;
	position: relative;
	padding: 10px;
	flex: 1;
	display: flex;
	height: 100px;
	border: 1px solid #f5f5f5;
	flex-direction: column;
	justify-content: flex-end;

	&:hover {
		background: #f2f2ff;
	}
`;

export const StyledSwitch = styled.div`
	height: 100px;
	width: 100%;
	background: rgb(53,136,228);
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	color: white;
`;

export const SwitchButton = styled.button`
	transition: background 200ms ease;
	background: transparent;
	border: none;
	cursor: pointer;
	width: 100px;
	color: white;
	&:hover {
		background: white;
		color: rgb(53, 136, 228);
	}
`;

export const StyledList = styled.ul`
	display: flex;
	list-style-type: none;
	width: 100%;
	background: rgb(33, 126, 218);
	color: #fff;
`;

export const StyledDayLabel = styled.li`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const StyledDayNumber = styled.span`
	position: absolute;
	right: 0;
	top: 0;
	padding: 2px;
	font-weight: bold;
`;

export const DateLabel = styled.div`
	font-size: 2.3rem;
	display: flex;
	align-items: center;
`;