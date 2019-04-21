import React, { Component, Fragment } from "react";

export class MateriaPage extends Component{
    // constructor(props) {
    //     super(props)
    // }
    setupMateria(mat){
        if(navigator.language.includes("en")){
            return {
                name : mat.nameEn,
                short: mat.shortName,
                img: mat.img,
                desc: mat.descEn, 
            }
        }
        return {
            name : mat.nameEs,
            short: mat.shortName,
            img: mat.img,
            desc: mat.descEs, 
        }
    }

    render(){
        const materia = this.setupMateria(this.props.materia);
        return(
            <Fragment>
                <h1> {materia.name}</h1>
                <h4> {materia.desc}</h4>
                <a href="/quiz" action="replace">
                    <h4>Click here to go to the only quiz available</h4>
                </a>
            </Fragment>

        );
    }

    
} 

export default MateriaPage