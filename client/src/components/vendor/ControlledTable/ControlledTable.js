import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import Checkbox from '../Checkbox/Checkbox';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import Show from '../Show/Show';
import ChoicePanel from '../ChoicePanel/ChoicePanel';
import './ControlledTable.sass';

const ControlledTable = ({
		style={},
		className="",
		booleans=undefined,
		map={}, // maps column name into given values
		data=[{}], // data array or async function that populates it
		withPagination=false, // Should pagination be turned on?
		limits=[5, 20, 35, 50], // Array of possible limits
		withLimit=false, // should limit be changable
		limit=20, // current limit
		pagesInTotal=1, // Total number of pages
		currentPage=1, // current page

		createButton=null,

		onDelete=null,
		onSelect=null,
		onCreate=null,
		onSelectMany=null,
		onChangeParam=function(){}
	}) => {
	const [header, setHeader] = useState({});
	const [rows, setRows] = useState(typeof data === 'object' ? data : [{}]);
	const [ready, setReady] = useState(false);
	const [rowLimit, setRowLimit] = useState(limit);
	const [page, setPage] = useState(currentPage);
	const [pageCount] = useState(pagesInTotal);
	const classes = classNames('ControlledTable', className);

	useEffect(() => {
		let mounted = true;
		const refreshData = async () => {
			setReady(false);
			let newData = await data({ limit: rowLimit, page });
			if (mounted) {
				setRows(newData);
				setReady(true);
			}
		}

		if (typeof data === 'function')
			refreshData();

		return () => { mounted = false };
	}, [rowLimit, page, data]);

	useEffect(() => {
		onChangeParam({ limit: rowLimit, page });
	}, [rowLimit, page, onChangeParam]);

	useEffect(() => {
		let mounted = true;

		const run = async () => {
			if (mounted)
				setReady(false);
			if (typeof data === 'function') {

				const json = await data({});
				if (mounted)
					setRows(json);
			}
			else {
				if (mounted)
					setRows(data);
			}
			if (mounted)
				setReady(true);
		}
		run();

		return () => { mounted = false };
	}, [data]);

	// Get table header based on first row
	useEffect(() => {
		let newHeader = {};
		Object.keys(rows[0]).forEach((field) => {
			newHeader[field] = true;
		});
		setHeader(newHeader);
	}, []);

	// Create checkboxes that toggles columns
	const columns = Object.keys(header).map((name, index) => {
		return (
			<Checkbox
				key={ index }
				label={ map[name] ? map[name] : name }
				name={ name }
				checked={ header[name] ? true : false }
				onChange={ (name, checked) => { setHeader({ ...header, [name]: checked }) }}/>
		);
	})

	return (
		<div className={classes} style={style}>
			<Loader size={30} thickness={3} visibility={!ready}/>
			<Show when={ready}>
				{/* Select header fields */}
				<div className="flex space-between">
					<div className="activeFields" style={{marginBottom: "15px"}}>
						{ columns }
					</div>
					{ onCreate && <div>
						{ createButton ?
							React.cloneElement(createButton, { ...createButton.props, onClick: onCreate })
							:
							<button onClick={onCreate}>Create</button> }
					</div>
					}
				</div>

				<Table
					booleans={booleans}
					onRowSelect={onSelect}
					onRowDelete={onDelete}
					body={rows}
					header={ Object.keys(header).filter(name => header[name]) }
					map={map}/>

				<div className="flex space-between align-center">
					<Show when={withPagination}>
						<Pagination onChangePage={setPage} page={page} pageCount={pageCount}/>
					</Show>
					<Show when={withLimit}>
						<ChoicePanel default={rowLimit} options={limits} onSelect={(limit) => { setRowLimit(limit) }}/>
					</Show>
				</div>
			</Show>
		</div>
	);
}

ControlledTable.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	withPagination: PropTypes.bool,
	withLimit: PropTypes.bool,
	limits: PropTypes.arrayOf(PropTypes.number),
	limit: PropTypes.number,

	onSelectMany: PropTypes.func,
	onDelete: PropTypes.func,
	onCreate: PropTypes.func,
	onSelect: PropTypes.func,
	onChangeParam: PropTypes.func
}

export default ControlledTable;