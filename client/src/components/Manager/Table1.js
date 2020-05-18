import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Row from './Row';
import Table3 from './Row';


export default class Table1 extends React.Component {

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.state={
            open: false
        };
    }

    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }

    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
            return <TableCell key={key}>{key.toUpperCase()}</TableCell>
        })
    }

    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();

        return items.map((row, index)=>{
            return <TableRow key={index} onClick={this.toggleRow.bind(this)}><RenderRow key={index} data={row} keys={keys}/></TableRow>
        })
    }

    toggleRow(e) {
        this.setState({open: !this.state.open});
    }



    render() {
        return (
            <TableContainer component={Paper}  >
                <Table aria-label="collapsible table" style={{ }}>
                    <TableHead>
                        <TableRow >
                            {this.getHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.getRowsData()}
                    </TableBody>
                </Table>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Table3/>
                </Collapse>
            </TableContainer>
        );

    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <TableCell key={props.data[key]}>{props.data[key]}</TableCell>
    })
}
