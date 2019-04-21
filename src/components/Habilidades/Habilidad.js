import React, { Component } from "react";
//import { Link } from "react-router-dom";

export class Habildad extends Component {
    /*constructor(props) {
        super(props)
    }*/

    render() {
        const habilidad = this.props.habilidad;
        return (

            <div className="card text-left p-4 mx-auto my-3" style={{ width: 16 + "rem" }}>


                <div className="card-title">
                    {habilidad.name}
                </div>
                <div className="card-text">
                    Esta sería la descripcion de {habilidad.name}.
                        <br />
                    Si haces click en este recuadro, podras acceder a los juegos que te van a
                        ayudar con tu renimiento en {habilidad.name}.
                        <br />
                    Allí podrás verlos separados por materia.
                    </div>

            </div>
        );
    }


}

export default Habildad