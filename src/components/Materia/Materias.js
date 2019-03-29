import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { Route } from 'react-router-dom'


export class Materias extends Component{
    constructor(props) {
        super(props)
        this.state = {
            habilidades: [],
        }
    }

    renderMateria(materia){
        var ref = "/materias/" + String(materia.id);

        return (
            <a href= {ref}>
                <div className="card">
                    <div className="card-body">
                        <div className="subject-picture">
                            <img src="/images/Integral-icon.png"/>
                        </div>
                        <div className="card-title">
                            {materia.name}
                        </div>
                        
                    </div>
                </div>
            </a>

        );
    }
    getMaterias(){
        var ret= [];
        axios.get("http://localhost:3001/materias/").then(res => {
            ret = list(res);
        });
        return ret;
    }

    render(){
        const materias = list(this.getMaterias());
        const cards = [];
        for(var materia of materias) { 
            cards.push(<li>{this.renderMateria(materia)}</li>)
        }
        return(
            <Fragment>
                <ul>
                    {cards}
                </ul> 
                <Route exact path={`${match.path}/:id`} render={props => (
                        <Fragment>
                            <BlogDetail {...props} />
                        </Fragment>
                    )}
                />
            
            </Fragment>
        );
    }
} 

export default Materias