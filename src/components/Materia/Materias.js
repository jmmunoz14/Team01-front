import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { Route } from 'react-router-dom'


export class Materias extends Component{
    constructor(props) {
        super(props)
        this.state = {
            materias : [],
        }
    }

    renderMateria(materia){
        var ref = "/materias/" + String(materia.id);

        return (
            <a href= {ref}>
                <div className="card">
                    <div className="card-body">
                        <div className="subject-picture">
                            <img src="/images/Integral-icon.png" width= "80em"/>
                        </div>
                        <div className="card-title">
                            {materia.name}
                        </div>
                        <div className="card-text">
                            Esta es la descripcion de una materia. Con nuetra pagina, podras mejorar tu renimiento en esta amteria
                            
                        </div>
                        
                    </div>
                </div>
            </a>

        );
    }
    getMaterias(callback){
        axios.get("http://localhost:3000/materias/").then(res => {
            this.setState({materias: res.data});          
        });

    }

    render(){
        this.getMaterias();
        const cards = [];
            for(var materia of this.state.materias) { 
                cards.push(<li>{this.renderMateria(materia)}</li>)
            }
            return(
                <Fragment>
                    <ul>
                        {cards}
                    </ul> 
                    {/* <Route exact path={`${match.path}/:id`} render={props => (
                            <Fragment>
                                <BlogDetail {...props} />
                            </Fragment>
                        )}
                    /> */}
                
                </Fragment>
            );
        
    }
} 

export default Materias