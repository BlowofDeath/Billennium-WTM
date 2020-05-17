import styled from 'styled-components';

export const StyledWeek = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-between;
`;

export const StyledDay = styled.li`
	padding: 10px;
	flex: 1;
	height: 100px;
	border: 1px solid #dedede;
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

export const DateLabel = styled.div`
	font-size: 2.3rem;
	display: flex;
	align-items: center;
`;