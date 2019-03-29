import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export class PostBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "Nuevo Blog",
      descripcion: "Descripcion Blog",
      materias: [],
    };
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:3000/materias')
      .then(res => this.setState({ materias: res.data }))
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });
  getFecha = () => {
    var d = Date(Date.now());

    return d.toString();
  };

  render() {
    const { handlePostBlog } = this.props;
    const { materias, titulo, descripcion } = this.state;
    return (
      <div className="row">
        <Link className="btn btn-danger blog btn-lg btn-block" to="/blogs">
          Cancelar
        </Link>
        <div className="col-lg-8 col-md-10 mx-auto">
          <h1 className="blog">Post Blog</h1>
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
              <p className="blogDesc">Descripcion del Blog (Puede Compilar MarkDown):</p>
            </div>
            <div className="col">
              <textarea style={{ height: "500px" }} onChange={this.onChange} value={descripcion} className="form-control" type="text" name="descripcion" id="PostDescripcion" />
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
          <Link onClick={() => handlePostBlog({
            titulo: titulo, descripcion: descripcion, date: this.getFecha(),
            idUsuario: localStorage.getItem("username")+""
          })
          }
            className="btn btn-success btn-lg btn-block" to="/blogs">
            Crear Blog
          </Link>
        </div>
      </div>
    );
  }
}

export default PostBlog;
