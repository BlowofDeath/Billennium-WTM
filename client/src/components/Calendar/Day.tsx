import React, { FC } from 'react';
import { StyledDay } from './Atoms';

const Day: FC = ({ children }) => {
	return <StyledDay>{ children }</StyledDay>;
}

export default Day;