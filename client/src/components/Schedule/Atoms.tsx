import styled from 'styled-components';

export const EventBlock = styled.div`
	white-space: nowrap;
	width: min-content;
	height: 85%;
	padding: 5px 10px;
	background: lightgreen;
	border-radius: 4px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	margin: 0 10px;
	user-select: none;

	&:hover {
		cursor: pointer;
	}
`;