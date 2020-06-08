import { styled } from '@material-ui/styles';
import { Row } from './Row';

export const StyledListItem = styled(Row)({
	transition: "background 200ms ease",
	width: "100%",
	background: "#fefefe",
	padding: "20px",
	overflow: "hidden",
	borderBottom: "1px solid #efefef",

	"&:first-child": {
		borderTop: "1px solid #efefef"
	},
	"&:hover": {
		background: "#f4f4f4"
	}
})