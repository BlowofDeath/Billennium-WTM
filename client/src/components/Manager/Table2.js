import React from 'react';
import Table1 from './Table1';



export default class Table2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tableData:[
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezarrrry', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko'},
            ],
            tableData2:[
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko', 'Wiek': 15},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko', 'Wiek': 15},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko', 'Wiek': 15},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko', 'Wiek': 15},
                {'Imię': 'Cezary', 'Nazwisko': 'Dobreńko', 'Wiek': 15},
            ],
        }
    }


    render() {


        return (
            <div className="App">
                <br/> Table 1 data
                <Table1 data={this.state.tableData}/>

                <br/> Table 2 data
                <Table1 data={this.state.tableData2}/>
            </div>

        );
    }


}