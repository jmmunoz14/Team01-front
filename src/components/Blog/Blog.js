import React, { Component } from "react";
import { Link } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
class Blog extends Component {

  componentDidMount = () => {


  }
  reload = () => {
    window.location.reload()
  }

  render() {
    const { blog, handleDeleteBlog } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-9">
            <Link className="blog" to={"/blogs/" + blog._id} onClick={this.forceUpdate}>
              <h2 className="blog">
                {blog.titulo}
              </h2>
            </Link>
            <p className="blog">
            <FormattedMessage
                  id="Blog.publicadopor"
                  defaultMessage="Publicado Por"
                />
            <Link className="blog" to="/">{" " + blog.idUsuario + " "}</Link>
              {Date(blog.date)}</p>
          </div>
          <div className="col-lg-3">
            {localStorage.getItem("login") === "true" && <React.Fragment>
              <button className="btn btn-danger btn-lg btn-block" onClick={handleDeleteBlog}>
                <FormattedMessage
                  id="Blog.borrar"
                  defaultMessage="Borrar"
                /></button>
              <Link className="btn btn-warning btn-lg btn-block" to={"/blogs/api/put/" + blog._id}>
                <FormattedMessage
                  id="Blog.actualizar"
                  defaultMessage="Actualizar"
                /></Link></React.Fragment>}
          </div>
        </div>
        <hr>
        </hr>
      </React.Fragment>
    );
  }
}
export default Blog