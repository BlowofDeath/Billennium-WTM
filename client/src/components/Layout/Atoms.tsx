import { styled } from '@material-ui/core';
import { Grid, AppBar } from '@material-ui/core';

export const Sidebar = styled('div')({
	background: "#222222",
	color: "#dedede",
	height: "100%"
})

export const Container = styled(Grid)({
	position: "absolute",
	left: 0,
	top: 0,
	width: "100%",
	height: "100%"
})

export const StyledAppBar = styled(AppBar)({
	position: "relative",
	padding: 15,
	display: "flex",
	flexDirection: "row",
	alignItems: "center"
})

export const ContentContainer = styled('div')({
	position: "relative",
	background: "RGB(240,242,245)",
	overflowY: "scroll",
	maxHeight: "100vh",
	width: "100%",

	['@media (max-width: 600px)']: {
		width: "100%"
	},
	['@media (min-width: 600px) and (max-width: 960px)']: {
		width: "70vw"
	},
	['@media (min-width: 960px) and (max-width: 1280px)']: {
		width: "75vw"
	},
	['@media (min-width: 1280px) and (max-width: 1920px)']: {
		width: "80vw"
	}
})