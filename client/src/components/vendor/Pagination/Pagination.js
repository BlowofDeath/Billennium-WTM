import React, { useEffect, useReducer } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Pagination.sass';

const Page = ({ number, active=false, style={}, className="", onClick=function(){} }) => (
	<div onClick={onClick} style={style} className={"pagination__page "+ ((active) ? "page-active " : " ")+className}>
		{ number }
	</div>
);

const Pagination = ({ className="", style={}, page=1, pageCount=1, onChangePage=function(){} }) => {
	const classes = classNames('Pagination', className);
	const VISABLE = 2;

	// Page action reducer
	const [currentPage, dispatch] = useReducer((page, action) => {
		if (action.type === 'NEXT_PAGE') {
			return (page + 1 <= pageCount) ? page + 1 : page;
		}
		else if (action.type === 'PREV_PAGE') {
			return (page - 1 >= 1) ? page - 1 : page;
		}
		else if (action.type === 'SET') {
			return action.page;
		}
		else {
			return page;
		}
	}, page);

	useEffect(() => {
		onChangePage(currentPage);
	}, [currentPage, onChangePage]);

	return (
		<div className={classes} style={style}>
			<div className="pagination__pre">
				<MdNavigateBefore className="pagination__control control__prev" onClick={() => { dispatch({ type: 'PREV_PAGE' }) }}/>

				{ (currentPage-VISABLE <= 1) ? null : (<div className="flex">
					<Page number={1} onClick={() => {dispatch({ type: "SET", page: 1}) }}/>
					<span className="dots">...</span>
				</div>)}
			</div>
			<div className="page-container">
			{
				Array(2*VISABLE+1).fill(currentPage-VISABLE).map(
					(min, i) => (min+i < 1 || min+i > pageCount) ?
					null :
					(<Page
						key={i}
						number={min+i}
						active={(min+i === currentPage)}
						onClick={() => {dispatch({ type: "SET", page: min+i}) }}/>)
				)
			}
			</div>
			<div className="pagination__post">

				{(currentPage+VISABLE < pageCount) ? (<div className="flex">
					<span className="dots">...</span>
					<Page number={pageCount} onClick={() => {dispatch({ type: "SET", page: pageCount}) }}/>
				</div>) : null}

				<MdNavigateNext className="pagination__control control__next" onClick={() => { dispatch({ type: 'NEXT_PAGE' }) }}/>
			</div>
		</div>
	);
}

Pagination.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	page: PropTypes.number,
	pageCount: PropTypes.number,
	onChangePage: PropTypes.func
}

export default Pagination;