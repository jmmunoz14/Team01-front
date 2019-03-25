import React, { Component, Fragment } from 'react'

export class Comentario extends Component {
    render() {
        const { comentario } = this.props
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="media comment-box">
                            <div className="media-left">
                                <img alt="user" className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading blogDesc">{comentario.idUsuario}</h4>
                                <p className="coment">{comentario.comentario}</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Comentario
