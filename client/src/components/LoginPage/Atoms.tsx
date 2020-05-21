import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const StyledLoginPage = styled.div`
	background: #222;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledLoginForm = styled.form`
	position: relative;
	border-radius: 4px;
	background: #fefefe;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	width: 430px;
	min-height: 600px;
`;

export const StyledFormHeader = styled.h1`
	width: 100%;
	text-align: center;
	margin-bottom: 30px;
`;

export const StyledButton = styled(Button)`
	width: 100%;
	justify-self: flex-end;
	background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	box-shadow: '0 3px 5px 2px rgba(255, 105, 135, .3)';
`;