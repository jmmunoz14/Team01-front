import React, { Component } from 'react'

export class Partida extends Component {
  //<button className="btn btn-danger btn-lg btn-block" onClick={handleDeletePartida}>Borrar</button>
  //<Link className="btn btn-warning btn-lg btn-block" to={"/partidas/api/put/" + partida._id}>Actualizar</Link>
  render() {
    const { partida } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-9">
            <h2 className="blog">
              {"Juego # " + partida.idJuego}
            </h2>
            {partida.puntajes.map((puntaje, index) => (
              <h2 className="blog" key={index}>
                {"Usuario: " + partida.idUsuarios[index] + " Puntaje: " + puntaje}
              </h2>
            ))}
          </div>
          <div className="col-lg-3">

          </div>
        </div>
        <hr>
        </hr>
      </React.Fragment>
    );
  }
}

export default Partida
