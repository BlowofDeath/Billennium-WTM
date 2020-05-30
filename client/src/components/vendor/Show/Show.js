// ===========================================================================
import React from 'react';
import PropTypes from 'prop-types';
// ===========================================================================
const Show = ({ when = true, children }) => {
	return (
		<React.Fragment>
			{ when ? children : null }
		</React.Fragment>
	)
}
// ===========================================================================
Show.propTypes = {
	when: PropTypes.bool
}
// ===========================================================================
export default Show;