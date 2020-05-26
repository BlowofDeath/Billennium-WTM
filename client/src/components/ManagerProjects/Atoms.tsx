import { styled } from '@material-ui/styles';

export const StyledProjectContainer = styled('div')({
	display: "flex",
	flexDirection: "column"
})

export const StyledProjectItem = styled('div')({
	justifyContent: "space-between",
	transition: "background 200ms ease",
	display: "flex",
	width: "100%",
	background: "#fefefe",
	padding: "20px",
	borderBottom: "1px solid #efefef",

	"&:first-child": {
		borderTop: "1px solid #efefef"
	},
	"&:hover": {
		background: "#f4f4f4"
	}
})

export const StyledProjectInfo = styled('div')({
	display: "flex",
	flexDirection: "column"
})

export const StyledProjectDescription = styled('span')({
	color: "#777"
})