import React, { Component, Fragment } from 'react';
import Materia from "./Materia";
import MateriaPage from "./MateriaPage";
import TextField from '@material-ui/core/TextField';
import { Route,  BrowserRouter as Router } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export class Materias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materias: [],
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

    routes(products){
        const rows = [];
        products.forEach((mat) => {
          rows.push(
          <Route key={mat._id.toString()} 
                    path={"/" + mat.shortName} 
                    render = {(props) => <MateriaPage {...props} materia = {mat}/>}/>
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

        products.forEach((mat) => {
            if (this.noEncuentra(mat.nameEs,mat.nameEn,filterText)) {
                return;
            }
            rows.push(<Materia key={mat._id.toString()} materia={mat} />);
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
                        id="Materia.titulo"
                        defaultMessage= "Encuentra tus juegos por materia!"
                    />
                </h1>
                <TextField
                    fullWidth
                    placeholder={
                        navigator.language.includes("en") 
                        ? "Search for your subject"
                        : "Busca tu materia" }
                    onChange={this.handleSearch}
                    label= {
                        navigator.language.includes("en")
                        ? "Search for your subject:"
                        : "Busca tu materia:" 
                    }
                    id="search-subject"
                    />
                <Router>
                    {this.table(this.state.searchText,this.state.materias)}
                    
                </Router>
                
                 
            </div>
        );
    }
}

export default Materias