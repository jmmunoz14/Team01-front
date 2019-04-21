import React, { Component, Fragment } from 'react';
import Habilidad from "./Habilidad";
import HabilidadPage from "./HabilidadPage";
import TextField from '@material-ui/core/TextField';
import { Route,  BrowserRouter as Router } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export class Habilidades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            habilidades: [],
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

    routes(products){
        const rows = [];
        products.forEach((hab) => {
          rows.push(
          <Route key={hab._id.toString()} 
                    path={"/" + hab.shortName} 
                    render = {(props) => <HabilidadPage {...props} habilidad = {hab}/>}/>
                    );
        });
        return (
            <Fragment>
                {rows}
            </Fragment>
        );
    }

    noEncuentra(es,en, filterText){
        var esLo = String(es).toLowerCase();
        var enLo = String(en).toLowerCase();
        var text = String(filterText).toLowerCase()
        var esp = Boolean(esLo.indexOf(text) === -1);
        var eng = Boolean(enLo.indexOf(text) === -1);
        return Boolean(esp&&eng);
        
    }

    table(filterText,products){
        const rows = [];

        products.forEach((hab) => {
            if (this.noEncuentra(hab.nameEs,hab.nameEn,filterText)) {
                return;
            }
            rows.push(<Habilidad key={hab._id.toString()} habilidad={hab} />);
        });
        return (
            <Fragment>
                {this.routes(products)}
                <div className="row no-gutters mx-auto">
                    {rows}
                </div>
            </Fragment>
          
        );
    }

    render() {

        return (

            <div className="container">

                <h1>
                    <FormattedMessage 
                        id="Habilidad.titulo"
                        defaultMessage= "Encuentra tus juegos por habilidad!"
                    />
                </h1>
                <TextField
                    fullWidth
                    placeholder={
                        navigator.language.includes("en") 
                        ? "Search for your skill"
                        : "Busca tu habilidad" }
                    onChange={this.handleSearch}
                    label= {
                        navigator.language.includes("en")
                        ? "Search for your skill:"
                        : "Busca tu habilidad:" 
                    }
                    id="search-skill"
                    />
                <Router>
                    {this.table(this.state.searchText,this.state.habilidades)}
                    
                </Router>
                
                 
            </div>
        );
    }
}

export default Habilidades