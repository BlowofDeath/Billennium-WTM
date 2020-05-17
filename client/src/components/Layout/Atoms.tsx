import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const Sidebar = styled.div`
	background: #222222;
	color: #dedede;
	height: 100%;
`;

export const Container = styled(Grid)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;