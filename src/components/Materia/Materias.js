import React, { Component, Fragment } from 'react'
import Materia from "./Materia"
import MateriaPage from "./MateriaPage";
import TextField from '@material-ui/core/TextField';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


export class Materias extends Component{
    constructor(props) {
        super(props)
        this.state = {
            materias : [],
            imSrcs: [
                "/calculator.png",
                "/pencil.png",
                "/mathicon.png",
                "/pi.png",
                "/images/Integral-icon.png"
            ],
            searchText :""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }


    componentDidMount(){
        fetch('http://localhost:3000/materias/')
        .then(results => {
            return results.json();

        }).then(data => {
            this.setState({materias : data});
        })

    }

    handleSearch(event){
        this.setState({searchText: event.target.value});
    }

    routes(products){
        const rows = [];
        products.forEach((mat) => {
          rows.push(
          <Route key={mat._id.toString()} 
                    path={"/" + mat.name} 
                    render = {(props) => <MateriaPage {...props} materia = {mat}/>}/>
                    );
        });
        return (
            <Fragment>
                {rows}
            </Fragment>
        );
    }

    table(filterText,products){
        const rows = [];
        let lastCategory = null;
    
        products.forEach((mat) => {
          if (mat.name.indexOf(filterText) === -1) {
            return;
          }
          rows.push(<Materia key={mat._id.toString()} materia = {mat}/>);
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

    render(){
      return(
       
            <div className= "container">
                
                <h1>Find your game by Subject!</h1>
                <TextField
                    fullWidth
                    placeholder="Search for your subject"
                    onChange={this.handleSearch}
                    />
                <Router>
                    {this.table(this.state.searchText,this.state.materias)}
                    
                </Router>
                
                 
            </div>
        );
    }
} 

export default Materias