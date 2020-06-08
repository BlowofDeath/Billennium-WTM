import { styled } from "@material-ui/core";
import { Row } from "../Atoms/Row";
import { Column } from "../Atoms/Column";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

type CommonStylesType = BaseCSSProperties | {
	[key: string]: BaseCSSProperties
}

const common: CommonStylesType = {
	"& span": {
		display: "box",
		overflow: "hidden",
		textOverflow: "ellipsis",
		lineHeight: "18px",
		wordBreak: "break-word",
		maxHeight: "36px",
		lineClamp: 2,
		boxOrient: "vertical"
	}
}

export const ProjectListRow = styled(Row)({
	maxWidth: "50%",
	...common
})

export const ProjectListColumn = styled(Column)({
	maxWidth: "50%",
	...common
})