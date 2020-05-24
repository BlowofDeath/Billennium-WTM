import React, { FC, Fragment } from 'react';
import { styled, Grid } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface DrawerProps {
	style?: CSSProperties,
	className?: string
}

const Drawer: FC<DrawerProps> = ({ style={}, className="", children, ...props }) => {
	return (
		<div style={style} className={className} {...props} >
			{ children }
		</div>
	)
}

export default styled(Drawer)({
	['@media (max-width: 600px)']: {
		position: "fixed",
		left: 0,
		top: 0,
		width: "85vw",
		height: "100vh",
		zIndex: 1200
	},
	['@media (min-width: 600px) and (max-width: 960px)']: {
		width: "30vw"
	},
	['@media (min-width: 960px) and (max-width: 1280px)']: {
		width: "25vw"
	},
	['@media (min-width: 1280px) and (max-width: 1920px)']: {
		width: "20vw"
	}
});