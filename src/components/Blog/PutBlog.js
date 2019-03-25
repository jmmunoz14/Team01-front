import React, { Component } from 'react'
import { Link } from "react-router-dom"

export class PutBlog extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.blogs.find(blog=>blog._id===this.props.match.params.id);
    }



    onChange = e => this.setState({ [e.target.name]: e.target.value })
    getFecha = () => {
        var d = Date(Date.now());

        return d.toString()
    }

    render() {
        
        const { materias, handlePutBlog } = this.props
        const { titulo, descripcion } = this.state
        return (
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <h1 className="blog">Post new Blog</h1>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Titulo del Blog:</p>
                        </div>
                        <div className="col">
                            <input onChange={this.onChange} value={titulo} className="form-control" type="text" name="titulo" id="postTitulo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Descripcion del Blog:</p>
                        </div>
                        <div className="col">
                            <textarea onChange={this.onChange} value={descripcion} className="form-control" type="text" name="descripcion" id="PostDescripcion" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Materias:</p>
                        </div>
                        <div className="col">
                            {materias.map((materia, materiaIndex) => (
                                <p className="mat"><input type="radio" name="PostMaterias" id="PostMaterias" />{materia.name}</p>
                            ))}

                        </div>
                    </div>
                    <Link onClick={() => handlePutBlog({ titulo: titulo, descripcion: descripcion, date: " (Modified) "+this.getFecha() },this.props.match.params.id)} className="btn btn-success btn-lg btn-block" to="/blogs">Actualizar Blog</Link>

                </div>
            </div>
        )
    }
}

export default PutBlog
