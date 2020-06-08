import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Option from '../Option/Option';
import './ChoicePanel.sass';

const ChoicePanel = ({ style={}, className="", highlightSelected=true, onSelect=function(){}, label="", ...props }) => {
	const classes = classNames('ChoicePanel', className);
	const [options, setOptions] 	= useState(props.options || []);
	const [selected, setSelected] 	= useState(props.default || null);

	useEffect(() => {
		setOptions(props.options)
	}, [props.options])

	useEffect(() => {
		onSelect(selected, options.indexOf(selected));
	}, [selected, onSelect, options]);

	const children = options.map((option, index) => {
		return (
			<Option
				key={ index }
				onClick={ setSelected }
				active={ (highlightSelected) ? (option === selected) : false }
				dataKey={ option }>
			{ option }
			</Option>
		)
	})

	return (
		<div className={classes} style={style}>
			{ label }
			<div className="flex choicepanel__option__container">
				{ children }
			</div>
		</div>
	)
}

ChoicePanel.propTypes = {
	options: PropTypes.array,
	default: PropTypes.number,
	onSelect: PropTypes.func,
	label: PropTypes.string,
	highlightSelected: PropTypes.bool
}

export default React.memo(ChoicePanel);