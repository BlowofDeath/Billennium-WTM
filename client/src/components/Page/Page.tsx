import React, { FC, ReactNode } from 'react';
import { styled, CSSProperties } from '@material-ui/styles';

interface IProps {
	children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[] | string | null,
	style?: CSSProperties,
	className?: string
}

const Page: FC<IProps> = ({ children, style, className }) => {
	return (
		<div style={style} className={className}>
			{ children }
		</div>
	)
}

Page.defaultProps = {
	style: {},
	className: ""
}

export default styled(Page)({
	height: "100vh",
	width: "100%",
	overflowY: "scroll",
	padding: "10px",
	background: "RGB(240,242,245)"
})