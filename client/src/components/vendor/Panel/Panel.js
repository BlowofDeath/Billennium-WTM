// ===========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ===========================================================================
import './Panel.sass';
// ===========================================================================
const Panel = ({ style = {}, className = "", children }) => {
	const classes = classNames("Panel", className);

	return (
		<div className={ classes } style={ style }>
			{ children }
		</div>
	)
}
// ===========================================================================
Panel.propTypes = {
	style: 		PropTypes.object,
	className: 	PropTypes.string
}
// ===========================================================================
export default Panel;