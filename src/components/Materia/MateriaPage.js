import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class MateriaPage extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        const materia = this.props.materia;
        return(
            <Fragment>
                <h1> Works, materia = {materia.name}</h1>
                <Link to="/quiz"/>
            </Fragment>

        );
    }

    
} 

export default MateriaPage