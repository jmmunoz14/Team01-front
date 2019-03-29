import React from "react";
import { Link } from "react-router-dom"

const toolbar = props => (
    <nav className="navbar navbar-expand-sm navbar-dark navbar-custom p-0">
        <Link to="/" className="navbar-brand">The Math Games!</Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
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
        </div>
    </nav>
);

export default toolbar;
