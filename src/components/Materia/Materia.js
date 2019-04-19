import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Materia extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        const materia = this.props.materia;
        return(

                <div className="card text-left p-4 mx-auto my-3" style={{width: 16 + "rem"}}>
 
                    
                    <div className="card-title">
                        {materia.name}
                    </div>
                    <div className="card-text">
                        Esta sería la descripcion de {materia.name}.
                        <br/> 
                        Si haces click en este recuadro, podras acceder a los juegos que te van a
                        ayudar con tu renimiento en {materia.name}.
                        <br/>
                        Allí podrás verlos separados por habilidad.
                    </div>

            </div>
        );
    }

    
} 

export default Materia