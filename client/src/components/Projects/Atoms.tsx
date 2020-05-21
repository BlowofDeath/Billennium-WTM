import { Button } from '@material-ui/core';
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

export const StyledButton = styled(Button)({
	color: (props: any) => {
		if (props?.stop)
			return "RGB(230,52,52)";
		if (props?.inactive)
			return "#a0a0a0";
		return "RGB(72,204,118)";
	},
	border: (props: any) => {
		if (props?.stop)
			return "2px solid RGB(230,52,52)";
		if (props?.inactive)
			return "2px solid #a0a0a0";
		return "2px solid RGB(72,204,118)";
	},
	background: (props: any) => (props?.inactive) ? "#efefef" : "initial",
	cursor: (props: any) => (props?.inactive) ? "default" : "pointer",
	fontWeight: 700
})