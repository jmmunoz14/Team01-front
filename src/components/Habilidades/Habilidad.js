import React, { Component, Fragment } from "react";
import { Link} from "react-router-dom";


export class Habilidad extends Component {
    /*constructor(props) {
        super(props)
    }*/

    setupHabilidad(hab){
        if(navigator.language.includes("en")){
            return {
                name : hab.nameEn,
                short: hab.shortName,
                img: hab.img,
                desc: hab.descEn, 
            }
        }
        return {
            name : hab.nameEs,
            short: hab.shortName,
            img: hab.img,
            desc: hab.descEs, 
        }
    }
    render() {

        const habilidad = this.setupHabilidad(this.props.habilidad);

        return(
            <Fragment>   
                <Link to={"/"+ habilidad.short} action="replace" className="link-to-quiz">
                <div className="card text-center p-4 mx-2 my-3" style={{width: 16 + "rem"}}>
                    <img className="card-img-top" src={habilidad.img} 
                    alt={navigator.language.includes("en")
                    ? "Image of the skill " + habilidad.name
                    :"Imágen de la habilidad " + habilidad.name}/>
                    <div className="card-title">
                        {habilidad.name}
                    </div>
                    {/* <div className="card-text">
                        Esta sería la descripcion de {habilidad.name}.
                        <br/> 
                        Si haces click en este recuadro, podras acceder a los juegos que te van a
                        ayudar con tu renimiento en {habilidad.name}.
                        <br />
                    Allí podrás verlos separados por habilidad.
                    </div> */}
                </div>
            </Link>
            </Fragment>
            
        );
    }


}

export default Habilidad