import React, { Component } from 'react'
//import { Link } from "react-router-dom"
//import axios from 'axios'
//import { Route } from 'react-router-dom'
import Materia from "./Materia"
//import { Search } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';



export class Materias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materias: [],
            imSrcs: [
                "/calculator.png",
                "/pencil.png",
                "/mathicon.png",
                "/pi.png",
                "/images/Integral-icon.png"
            ],
            searchText: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:3000/materias/')
            .then(results => {
                return results.json();

            }).then(data => {
                this.setState({ materias: data });
            })

    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value });
    }

    table(filterText, products) {
        const rows = [];
        //let lastCategory = null;

        products.forEach((mat) => {
            if (mat.name.indexOf(filterText) === -1) {
                return;
            }
            rows.push(<Materia key={mat._id.toString()} materia={mat} />);
        });
        return (
            <div className="row no-gutters mx-auto">
                {rows}
            </div>
        );
    }

    render() {
        return (

            <div className="container">

                <h1>Find your game by Subject!</h1>
                <TextField
                    fullWidth
                    placeholder="Search for your subject"
                    onChange={this.handleSearch}
                />
                {this.table(this.state.searchText, this.state.materias)}

            </div>
        );
    }
}

export default Materias