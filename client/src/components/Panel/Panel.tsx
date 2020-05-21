import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface IProps {
	children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[] | string | null,
	style?: CSSProperties,
	className?: string
}

const Panel: FC<IProps> = ({ children, style, className }) => {
	return (
		<div style={style} className={className}>
			{ children }
		</div>
	)
}

Panel.defaultProps = {
	style: {},
	className: ""
}

export default styled(Panel)({
	background: "#fefefe",
	padding: "20px"
});