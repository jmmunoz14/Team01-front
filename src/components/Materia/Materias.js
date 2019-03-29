import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { Route } from 'react-router-dom'


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
            ]
        }
    }



    renderMateria(materia,indice){
        var ref = "/materias/" + String(materia.id);
     
        return (
            
                <div className="card">
                    <div className="card-body">
                        <div className="subject-picture">
                            <img src={this.state.imSrcs[4-indice]} width= "80em"/>
                        </div>
                        <div className="card-title">
                            {materia.name}
                        </div>
                        <div className="card-text">
                            Esta es la descripcion de una materia. Con nuetra pagina, podras mejorar tu renimiento en esta materia.
                    
                        </div>
                        
                    </div>
                </div>
     

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
            for(var materia in this.state.materias) { 
                cards.push(<li>{this.renderMateria(this.state.materias[materia],materia)}</li>)
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