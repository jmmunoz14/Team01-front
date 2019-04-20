import React, { Component } from 'react'
//import { Link } from "react-router-dom"
//import axios from 'axios'
//import { Route } from 'react-router-dom'
import Habilidad from "./Habilidad"
//import { Search } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';



export class Habilidads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            habilidades: [],
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
        fetch('http://localhost:3000/habilidades/')
            .then(results => {
                return results.json();

            }).then(data => {
                this.setState({ habilidades: data });
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
            rows.push(<Habilidad key={mat._id.toString()} habilidad={mat} />);
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

                <h1>Find your game by Skill!</h1>
                <TextField
                    fullWidth
                    placeholder="Search for your skill"
                    onChange={this.handleSearch}
                />
                {this.table(this.state.searchText, this.state.habilidades)}

            </div>
        );
    }
}

export default Habilidads