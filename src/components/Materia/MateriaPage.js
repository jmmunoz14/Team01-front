import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";

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
                <h2> {materia.desc}</h2>
                <u>
                    <a href="/quiz" action="replace" className= "click-quiz">
                        <h3>
                            <FormattedMessage
                                id = "Materia.clickQuiz"
                                defaultMessage = "Haz click aquí para ir al único quiz disponible"
                            />
                        </h3>
                    </a>
                </u>

            </Fragment>

        );
    }

    
} 

export default MateriaPage