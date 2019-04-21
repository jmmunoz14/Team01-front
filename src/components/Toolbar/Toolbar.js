import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'
import { FormattedMessage } from 'react-intl';
export class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            email: "",
            usuario: []
        };
    }//.filter(usuario=>usuario.username===this.state.username)

    setLogedUser = (e) => {
        console.log("login1")
        e.preventDefault();
        console.log("login2")
        axios
            .get('http://localhost:3000/api/obtainall')
            .then(res => {
                const use = res.data.filter(usuario => usuario.username === this.state.user)[0]
                if (use) {
                    this.setState({ usuario: use })
                    console.log(this.state.usuario)
                    if (this.state.usuario.password === this.state.password) {
                        localStorage.setItem("username", this.state.user)
                        localStorage.setItem("user", this.state.usuario)
                        localStorage.setItem("login", "true")
                        localStorage.setItem("id", this.state.usuario._id)
                        console.log(this.state.usuario._id)
                        console.log("Todobien")

                    }
                    else {
                        localStorage.setItem("login", "false")
                        console.log("PassIncorrecto")
                        if (window.navigator.language === "es") {
                            alert("Usuario o Contraseña Incorrectos")
                        }
                        else {
                            alert("Wrong User or Password")
                        }

                        localStorage.setItem("username", "")
                        localStorage.setItem("id", "")

                    }
                } else {
                    console.log("usuario Inva")
                    if (window.navigator.language === "es") {
                        alert("Usuario o Contraseña Incorrectos")
                    }
                    else {
                        alert("Wrong User or Password")
                    }
                    localStorage.setItem("login", "false")
                    localStorage.setItem("username", "")
                    localStorage.setItem("id", "")

                }
                window.location.reload();
                


            })

    }
    registerUser = (e) => {
        console.log("registro1")
        e.preventDefault();
        console.log("registro2")
        axios
            .post('http://localhost:3000/api/register', { id: (Math.random() * 10000000000) + 200, email: this.state.email, username: this.state.user, password: this.state.password })
            .then(res => {
                console.log(res.data)
                if (window.navigator.language === "es") {
                    alert("Usuario Creado, ahora puede iniciar sesión")
                }
                else {
                    alert("User created, now you can Log in")
                }

                window.location.reload();

                this.setState({ usuario: res.data })
            }).catch(err => {
                alert(err.response.data)
                console.log(err.response.data)
            })


    }
    setLogin = (login) => {
        localStorage.setItem("login", login ? "true" : "false")
        localStorage.setItem("username", "")
        localStorage.setItem("id", "")
        window.location.reload();
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    setActive(){
        var header = document.getElementsByClassName("navbar");
        var btns = document.getElementsByClassName("cirr");
        
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          if(current[0]!= undefined)
          {
            current[0].className = current[0].className.replace(" active", "");
          }
         
          this.className += " active";

          
          });
        }
    }

    componentDidMount()
    {
        this.setActive()
        
    }

    render() {
        
        return (

            
            <nav className="navbar navbar-expand-sm navbar-dark navbar-custom p-0">
                <Link to="/" className="nav-item nav-link cirr logo">
                    <FormattedMessage
                        id="Toolbar.title"
                        defaultMessage="The Math Games!"
                    />
                </Link>

                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav mr-auto">
                        <li>
                        <Link className="nav-item nav-link cirr" to="/"><FormattedMessage
                                id="Toolbar.inicio"
                                defaultMessage="Inicio"
                            /></Link>
                        </li>
                        <li>
                            <Link className="nav-item nav-link cirr" to="/blogs"><FormattedMessage
                                id="Toolbar.blogs"
                                defaultMessage="Blogs"
                            /></Link>
                        </li>

                        <li>
                            <Link className="nav-item nav-link cirr" to="/partidas"><FormattedMessage
                                id="Toolbar.partidas"
                                defaultMessage="Partidas"
                            />
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-item nav-link cirr" to="/quiz"><FormattedMessage
                                id="Toolbar.pruebas"
                                defaultMessage="Pruebas"
                            />
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-item nav-link cirr" to="/materias">
                                <FormattedMessage
                                    id="Toolbar.materias"
                                    defaultMessage="Materias"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-item nav-link cirr" to="/habilidades"><FormattedMessage
                                id="Toolbar.habilidades"
                                defaultMessage="Habilidades"
                            />
                            </Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav ml-auto">

                        {localStorage.getItem("login") === "true" && <li className="nav-item nav-link blog">
                            <FormattedMessage
                                id="Toolbar.bienvenido"
                                defaultMessage="Bienvenido"
                            />
                            {" " + localStorage.getItem("username") + "!!-"}
                        </li>}

                        {localStorage.getItem("login") === "true" && <li style={{ fontSize: "20px", left: "100px!important", right: "0px" }} className="btn btn-danger btn-large flex-row justify-content-between" onClick={() => this.setLogin(false)}>
                            <FormattedMessage
                                id="Toolbar.salir"
                                defaultMessage="Salir"
                            />
                        </li>}
                    </ul>
                    
                    {localStorage.getItem("login") !== "true" && <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-3 order-md-5"><a href="/home" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-3">
                            <button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn btn-outline-secondary btn-info dropdown-toggle">
                                <FormattedMessage
                                    id="Toolbar.registrarse"
                                    defaultMessage="Registrarse"
                                />
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right mt-2">
                                <li className="px-3 py-2">
                                    <form className="form" onSubmit={this.registerUser}>
                                        <div className="form-group">
                                            <label>
                                                <FormattedMessage
                                                    id="Toolbar.usuario"
                                                    defaultMessage="Nombre de Usuario"
                                                />
                                                <font color="crimson">*</font><input className="form-control form-control-sm" type="text" required onChange={this.onChange} name="user" value={this.state.user} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <FormattedMessage
                                                    id="Toolbar.correo"
                                                    defaultMessage="Correo Electronico"
                                                />
                                                <font color="crimson">*</font><input className="form-control form-control-sm" type="email" required onChange={this.onChange} name="email" value={this.state.email} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <FormattedMessage
                                                    id="Toolbar.contraseña"
                                                    defaultMessage="Contraseña"
                                                />
                                                <font color="crimson">*</font><input id="passwordInput1" className="form-control form-control-sm" type="password" required onChange={this.onChange} name="password" value={this.state.password} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-block"><FormattedMessage
                                                id="Toolbar.registrarse"
                                                defaultMessage="Registrarse"
                                            />
                                            </button>
                                            <br></br>
                                            <font color="crimson"><FormattedMessage id="obligatorio" defaultMessage="Los campos con * son obligatorios"/></font>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>}
                    {localStorage.getItem("login") !== "true" && <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-3 order-md-5"><a href="/home" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-3">
                            <button type="button" id="dropdownMenu2" data-toggle="dropdown" className="btn btn-outline-secondary btn-success dropdown-toggle">
                                <FormattedMessage
                                    id="Toolbar.iniciar"
                                    defaultMessage="Ingresar"
                                />
                                <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right mt-2">
                                <li className="px-3 py-2">
                                    <form className="form" onSubmit={this.setLogedUser}>
                                        <div className="form-group">
                                            <label>
                                                <FormattedMessage
                                                    id="Toolbar.usuario"
                                                    defaultMessage="Nombre de Usuario"
                                                />
                                                <input className="form-control form-control-sm" type="text" required onChange={this.onChange} name="user" value={this.state.user} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <FormattedMessage
                                                    id="Toolbar.contraseña"
                                                    defaultMessage="Contraseña"
                                                />
                                                <input id="passwordInput2" className="form-control form-control-sm" type="password" required onChange={this.onChange} name="password" value={this.state.password} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-block">
                                                <FormattedMessage
                                                    id="Toolbar.iniciar"
                                                    defaultMessage="Ingresar"
                                                />
                                            </button>
                                        </div>

                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>}
                </div>

                
            </nav>
            
            )
    }
};


export default Toolbar;