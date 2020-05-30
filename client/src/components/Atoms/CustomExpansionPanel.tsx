import React from 'react';
import { styled } from '@material-ui/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Panel from '../Panel/Panel';
import { MdExpandMore } from 'react-icons/md';

export const CustomExpansionPanel = styled
(({ children, header, ...props }) => (
	<Panel>
		<ExpansionPanel {...props}>
			<ExpansionPanelSummary expandIcon={<MdExpandMore />}>
				{ header }
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{ children }
			</ExpansionPanelDetails>
		</ExpansionPanel>
	</Panel>
))
({
	padding: 0,
	margin: 0,
	boxShadow: "none"
});