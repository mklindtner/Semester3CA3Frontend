import React, { Component } from 'react';
const URLSW = require("../../package.json").urls.SW;
const entityAmount = 5;

class StarwarsTable extends Component {
    constructor() {
        super();
        this.state = {
            persons: [],
            start_index: 0
        }
    }

    componentDidMount() {
        fetch(URLSW + "/" + this.state.start_index + "/" + entityAmount)
            .then((response) => {
                return response.json();
            })
            .then(responseAsJson =>
                this.setState({
                    persons: responseAsJson
                })
            );
    }

    pageNext = () => {
        let currentIndex = this.state.start_index;
        this.setState({
            start_index: ++currentIndex
        });
        this.componentDidMount();
    }

    pagePrev = () => {
        let currentIndex = this.state.start_index;
        this.setState({
            start_index: --currentIndex
        });
        this.componentDidMount();
    }

    //chnage prev & next into 1 component
    //https://docs.google.com/document/d/15XRzm0SlW13eRUvQq8u19oAM9Jo2_iderDsnWlIBjsY/edit

    render() {
        return (
            <form>
                <table>
                    <thead>
                        {<StarwarsHeader dataFromSW={this.state.persons} />}
                    </thead>
                    <tbody>
                        <StarwarsTableData dataFromSW={this.state.persons} />
                    </tbody>
                </table>
                <input
                    type="button"
                    value="prev page"
                    onClick={this.pagePrev}
                />
                <input
                    type="button"
                    value="next page"
                    onClick={this.pageNext}
                />
            </form>
        );
    }
}

const StarwarsHeader = ({ dataFromSW }) => {
    if (dataFromSW.length === 0)
        return null;

    let keysOfStars = Object.keys(dataFromSW[0]);

    const resultOfHeaders = keysOfStars.map((header) => {
        return (
            <th key={header}>
                {header}
            </th>
        );
    });

    return (
        <>
            <tr>
                {resultOfHeaders}

            </tr>
        </>
    );
}


const StarwarsTableData = ({ dataFromSW }) => {
    if (dataFromSW.length === 0)
        return null;

    const totalRows = dataFromSW.map((arrayOfData, index) => {
        let keysData = Object.values(dataFromSW[index]);
        return (
            //this is not a unique key for every row, do not move / delete elements on this, if I do, make a unique key
            <tr keys={arrayOfData}>
                {keysData.map(dataRow =>
                    <td>{dataRow}</td>
                )}
            </tr>
        );
    });

    return (
        <>
            {totalRows}
        </>
    );
}

export default StarwarsTable;