import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Option.sass';

const Option = ({ className="", style={}, children, onClick=function(){}, active=false, dataKey=null, ...props }) => {
	const classes = classNames('Option', className, { active });

	return (
		<div
			style={style}
			onClick={ () => { onClick(dataKey) } }
			data-key={ dataKey }
			className={classes}>
			{ children }
		</div>
	)
}

Option.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	onClick: PropTypes.func,
	active: PropTypes.bool,
	dataKey: PropTypes.any
}

export default Option;