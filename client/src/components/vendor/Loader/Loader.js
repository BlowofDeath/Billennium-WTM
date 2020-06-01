// ===========================================================================
import React 		from 'react';
import PropTypes 	from 'prop-types';

import Panel 		from '../Panel/Panel';
// ===========================================================================
import './Loader.sass';
// ===========================================================================
const Loader = (props) => {
	const size 			= props.size;
	const thickness 	= props.thickness;
	const visibility 	= props.visibility || false;
	const panel 		= props.panel;

	const $style = {
		borderWidth: 	thickness+'px',
		width: 			size+'px',
		height: 		size+'px'
	}

	const loader = (
		<div className="Loader" style={{ display: (visibility) ? 'flex' : 'none' }}>
			<div className="spinner" style={ $style }></div>
		</div>
	)

	return (panel) ? <Panel style={{ display: (visibility) ? 'flex' : 'none', height: (size * 3)+'px' }}>{ loader }</Panel> : loader;
}
// ===========================================================================
Loader.propTypes = {
	size: 		PropTypes.number,
	thickness: 	PropTypes.number,
	visibility: PropTypes.bool
}
// ===========================================================================
export default Loader;