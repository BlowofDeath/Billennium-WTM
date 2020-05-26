import React, { FC, ReactNode } from 'react';
import { styled, CSSProperties } from '@material-ui/styles';

interface IProps {
	/**  */
	children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[] | string | null,
	/**  */
	style?: CSSProperties,
	/**  */
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
	width: "100%",
	padding: "10px"
})