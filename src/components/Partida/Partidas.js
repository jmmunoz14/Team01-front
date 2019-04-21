import React, { Component, Fragment } from 'react'
import Partida from "./Partida";
import PostPartida from './PostPartida'
import PutPartida from './PutPartida'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

export class Partidas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partidas: [],
            chats: [],
            usuarios: [],
            cargaUsuarios: false,
        }
    }
    componentDidMount = () => {
        axios
            .get('http://localhost:3000/partidas')
            .then(res => this.setState({ partidas: res.data }))
        axios
            .get('http://localhost:3000/api/obtainall')
            .then(res => {
                this.setState({ usuarios: res.data })
                this.setState({ cargaUsuarios: true })
            })
    }




    handlePostPartida = partida => {
        // console.log(partida)
        var chat = {
            color: '#e786d1',
            enabled: true,
            comentarios: []
        }
        axios.post('http://localhost:3000/chats', chat).then(res => {
            this.setState({ chats: [...this.state.chats, res.data] })
            var partidanew = {
                idUsuarios: partida.idUsuarios,
                puntajes: partida.puntajes,
                idJuego: partida.idJuego,
                finalizado: partida.finalizado,
                idChat: this.state.chats[this.state.chats.length - 1].chatCreada._id
            }
            axios
                .post('http://localhost:3000/partidas', partidanew)
                .then(res => this.setState({ partidas: [...this.state.partidas, res.data] }))
        })
    }

    handleDeletePartida = (id, idChat) => {
        console.log(id)
        axios.delete(`http://localhost:3000/partidas/${id}`).then(res =>
            this.setState({
                partidas: [...this.state.partidas.filter(partida => partida._id !== id)]
            })
        )

        axios.delete(`http://localhost:3000/chats/${idChat}`).then(res =>
            this.setState({
                chats: [...this.state.chats.filter(chat => chat._id !== idChat)]
            })
        )
    }

    handlePutPartida = (partida, id) => {
        const { partidas } = this.state
        axios.put(`http://localhost:3000/partidas/${id}`, partida).then(res =>
            this.setState({ partidas: [...partidas.splice(partidas.indexOf(partidas.find(partida => partida._id === id)), 1, res.data)] })
        )
    }

    //<Link className="btn btn-success btn-lg btn-block" to="/partidas/api/post">Añadir Nuevo Partida</Link>

    render() {
        const { partidas, usuarios } = this.state
        return (
            <Fragment>
                <h1 className="blog" style={{ color: '#0069D1' }}>
                    <FormattedMessage
                        id="Partida.titulo"
                        defaultMessage="Partidas en Curso"
                    />
                </h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {this.state.cargaUsuarios && partidas.map((partida, partidaIndex) => (
                                <Partida usuarios={usuarios} partida={partida} partidaIndex={partidaIndex} key={partidaIndex} handleDeletePartida={() => this.handleDeletePartida(partida._id, partida.idChat)} />))}

                        </div>
                    </div>
                </div>

                <Route exact path='/partidas/api/post' render={props => (
                    <Fragment>
                        <PostPartida {...props} handlePostPartida={partida => this.handlePostPartida(partida)} />
                    </Fragment>
                )}
                />

                <Route exact path='/partidas/api/put/:id' render={props => (
                    <Fragment>
                        <PutPartida {...props} handlePutPartida={(partida, id) => this.handlePutPartida(partida, id)} />
                    </Fragment>
                )}
                />
            </Fragment>
        )
    }
}

export default Partidas
