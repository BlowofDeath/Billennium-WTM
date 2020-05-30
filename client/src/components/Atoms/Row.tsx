import React, { ReactNode } from 'react'
import { styled } from "@material-ui/styles";

type JustifyContentType = { justifyContent?: "space-between" | "space-around" | "flex-end" };

type RowProps = JustifyContentType & {
	children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[] | string | number | null;
}

export const Row = styled(
	({ children, justifyContent, ...props }: RowProps) => <div {...props}>{ children }</div>)
	(({ justifyContent }: JustifyContentType) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: justifyContent ?? "space-between"
}))