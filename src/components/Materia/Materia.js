import React, { Component, Fragment } from "react";
import { Link} from "react-router-dom";


export class Materia extends Component {
    /*constructor(props) {
        super(props)
    }*/

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
    render() {

        const materia = this.setupMateria(this.props.materia);

        return(
            <Fragment>   
                <Link to={"/"+ materia.short} action="replace">
                <div className="card text-center p-4 mx-2 my-3" style={{width: 16 + "rem"}}>
                    <img className="card-img-top" src={materia.img} 
                    alt={navigator.language.includes("en")
                    ? "Image of the subject " + materia.name
                    :"Imágen de la materia " + materia.name}/>
                    <div className="card-title">
                        {materia.name}
                    </div>
                    {/* <div className="card-text">
                        Esta sería la descripcion de {materia.name}.
                        <br/> 
                        Si haces click en este recuadro, podras acceder a los juegos que te van a
                        ayudar con tu renimiento en {materia.name}.
                        <br />
                    Allí podrás verlos separados por habilidad.
                    </div> */}
                </div>
            </Link>
            </Fragment>
            
        );
    }


}

export default Materia