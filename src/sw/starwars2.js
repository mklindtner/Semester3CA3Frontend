import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
const URLSW = require("../../package.json").urls.SW;
const startIndex = 1, entityAmount = 5, totalPages = 10;




class StarwarsTable2 extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            persons: [],
            page: startIndex,
            sizePerPage: entityAmount,
            totalSize: 25
        })
    }

    componentDidMount() {
        const { page, sizePerPage, totalSize } = this.state;
        this.handleTableChange('didMount', { page, sizePerPage });
    }

    columns = () => [{
        dataField: 'name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'mass',
        text: 'Mass'
    },
    {
        dataField: 'eye_color',
        text: 'eyes'
    },
    {
        dataField: 'birth_year',
        text: 'birth'
    }];

    handleTableChange = async (type, props) => {
        const { page, sizePerPage } = props;
        console.log(props)  //Monitor this output, when you test this step
        const currentIndex = (page - 1) * sizePerPage;
        const URI = `${URLSW}/${currentIndex}/${sizePerPage}`;
        console.log(URI);
        let p = await fetch(URI)
            .then(res => {
                return res.json();
            })
            .then(jsonObjects => {
                console.log(jsonObjects)
                this.setState({ page, sizePerPage, persons: jsonObjects })
            });

    }


    render() {
        const { page, sizePerPage, totalSize } = this.state;
        //console.log("index: " + page + "\nsizePerPage:" + sizePerPage + "\ntotalSize: " + totalSize);
        return (
            <div>
                <BootstrapTable
                    striped
                    remote
                    hover
                    bootstrap4
                    data={this.state.persons}
                    keyField='name'
                    columns={this.columns()}
                    onTableChange={this.handleTableChange}
                    pagination={paginationFactory({ page, sizePerPage, totalSize })}
                />
            </div>
        );

    }
}

export default StarwarsTable2;


/*

 fetch(URLSW + "/" + startIndex + "/" + entityAmount)
            .then((response) => {
                return response.json();
            })
            .then(responseAsJson =>
                this.setState({
                    persons: responseAsJson
                })
            );

*/


/*
const { page, sizePerPage} = props;
        console.log("page is: " + page + "\n sizePerPage is: " + sizePerPage);
        await fetch(URLSW + "/" + page + "/" + sizePerPage)
            .then((response) => {
                return response.json();
            })
            .then(responseAsJson =>
                this.setState({
                    persons: responseAsJson
                })
            );
        console.log(this.state.persons);



*/