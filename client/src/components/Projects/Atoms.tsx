import { Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';

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