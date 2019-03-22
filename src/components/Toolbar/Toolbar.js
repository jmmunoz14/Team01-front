import React from "react";

const toolbar = props => (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a href="#App" className="navbar-brand">Academind</a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#App" className="nav-link">Users</a>
                </li>
                <li className="nav-item">
                    <a href="#App" className="nav-link">Products</a>
                </li>
            </ul>
        </div>
    </nav>
);

export default toolbar;
