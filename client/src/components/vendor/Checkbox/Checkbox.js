import React, { useState, useReducer, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Checkbox.sass';

const Checkbox = ({ className="", style={}, label="Checkbox", name=null, onChange=function(){}, checked=false }) => {
	const classes = classNames('Checkbox', className);
	const [isChecked, toggle] = useReducer((state) => !state, checked);

	useEffect(() => {
		onChange(name, isChecked);
	}, [isChecked]);

	return (
		<div className={classes} style={style}>
			<input type="checkbox" checked={ isChecked } onChange={ toggle }/>
			<span className="checkbox__mark" onClick={ toggle }>
				<FaCheck className="checkbox__mark__icon"/>
			</span>
			<label>{ label }</label>
		</div>
	);
}

Checkbox.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	checked: PropTypes.bool
}

export default Checkbox;