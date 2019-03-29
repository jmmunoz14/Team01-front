import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'

export class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: "username",
          password: "password",
          usuarios:[]
        };
      }//.filter(usuario=>usuario.username===this.state.username)
      
    setLogedUser = (e) => {
        e.preventDefault();
        axios
      .get('http://localhost:3000/api/obtainall')
      .then(res => {
          this.setState({ usuarios: res.data })
          console.log(res.data[0])
          console.log(this.state.user)
          console.log(this.state.usuarios.filter(usuario=>usuario.username===this.state.user)[0])

    })

        sessionStorage.setItem("user",this.state.user)
        localStorage.setItem("user",this.state.user)
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {

        return (
            <nav className="navbar navbar-expand-sm navbar-dark navbar-custom p-0">
                <Link to="/" className="navbar-brand">The Math Games!</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/habilidades">Habilidades</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/partidas">Partidas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quiz">Preguntas</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-3 order-md-5"><a href="#" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-3">
                            <button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle">Login <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right mt-2">
                                <li className="px-3 py-2">
                                    <form className="form" role="form" onSubmit={this.setLogedUser}>
                                        <div className="form-group">
                                            <input className="form-control form-control-sm" type="text" required="" onChange={this.onChange} name="user" value={this.state.user} />
                                        </div>
                                        <div className="form-group">
                                            <input id="passwordInput" placeholder="Password" className="form-control form-control-sm" type="text" required="" onChange={this.onChange} name="password" value={this.state.password}/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <div className="form-group text-center">
                                            <small><a href="#" data-toggle="modal" data-target="#modalPassword">Forgot password?</a></small>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>)
    }
};

export default Toolbar;
