import styled from 'styled-components';

export const EventBlock = styled.div`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	max-width: 250px;
	height: 55px;
	padding: 5px 10px;
	background: lightgreen;
	border-radius: 4px;
	margin: 3px 10px;

	> span:first-child {
		display: flex;
		justify-content: center;
	}
`;