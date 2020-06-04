import React from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Table.sass';

const Table = ({ style={}, className='', body=[], header=[], onRowSelect=function(){}, onRowDelete, map={}, booleans={ true: "yes", false: "no" } }) => {
	const classes = classNames('Table', className, {})
	
	const ths = header.map((column, index) => <th key={index}>{ map[column] ? map[column] : column }</th>);

	if (onRowDelete)
		ths.push(<th key={`key-action-th`}>Actions</th>);

	body = body.map((row, i) => {
		return (
			<tr onClick={() => { onRowSelect(row) }} key={i}>
				{ header.map((key, j) => (
					<td key={j}>
						{ typeof row[key] !== 'boolean' ? row[key] :
						  row[key] ? booleans.true : booleans.false }
					</td>
					)
				)}
				{ onRowDelete && <td key={`action-key-${i}`}>
					{ onRowDelete && <FaTrash onClick={(e) => { e.stopPropagation(); onRowDelete(row) }}/> }
				</td>
				}
			</tr>
		);
	})

	return (
		<table className={classes}>
			<thead>
				<tr>{ ths }</tr>
			</thead>
			<tbody>
				{ body }
			</tbody>
		</table>
	);
}

Table.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	body: PropTypes.arrayOf(PropTypes.object),
	header: PropTypes.array,
	onRowSelect: PropTypes.func,
	onRowDelete: PropTypes.func
}

export default Table;