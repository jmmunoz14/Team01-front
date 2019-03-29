import React, { Component,useContext } from "react";
import { Link } from "react-router-dom"
import UserContext from "../User/UserContext"

class Blog extends Component {
  
  componentDidMount = () => {
    
  
  }
  

  render() {
    const { blog, handleDeleteBlog } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-9">
            <Link className="blog" to={"/blogs/" + blog._id}>
              <h2 className="blog">
                {blog.titulo}
              </h2>
              <h3 className="blog">
                {blog.titulo}
              </h3>
            </Link>
            <p className="blog">Posted by
            <Link className="blog" to="/">{" " + blog.idUsuario + " "}</Link>
              on {blog.date}</p>
          </div>
          <div className="col-lg-3">
            {localStorage.getItem("login")==="true"&&<React.Fragment>
            <button className="btn btn-danger btn-lg btn-block" onClick={handleDeleteBlog}>Borrar</button>
            <Link className="btn btn-warning btn-lg btn-block" to={"/blogs/api/put/" + blog._id}>Actualizar</Link></React.Fragment>}
          </div>
        </div>
        <hr>
        </hr>
      </React.Fragment>
    );
  }
}
Blog.contextType=UserContext;
export default Blog