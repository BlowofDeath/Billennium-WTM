import { styled } from '@material-ui/styles';

export const FlexGroup = styled('div')({
	display: "flex",
	flexWrap: "wrap"
})

export const StyledSquareBlock = styled('div')({
	flex: (props: any) => props.flex,
	background: "RGB(255,255,255)",
	minHeight: "200px",
	margin: "0 10px",
	padding: "10px 20px",
	color: "#333"
})

export const StatSecondaryText = styled('span')({
	fontSize: "0.9rem",
	color: "#a0a0a0"
})

export const StatNumber = styled('span')({
	fontSize: (props: any) => props.size ? `${props.size}rem` : "3rem",
	color: (props: any) => props.color ? props.color : "#222"
})