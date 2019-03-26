import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import axios from "axios";

export class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      chatLoad: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/blogs/" + this.props.match.params.id)
      .then(res => {
        this.setState({ blog: res.data });
        this.setState({ chatLoad: true });
        //console.log(this.state.blog)
      });
  }
  render() {
    const { blog, chatLoad } = this.state;
    return (
      <div>
        <Link className="btn btn-warning blog btn-lg btn-block" to="/blogs">
          Return to blogs
        </Link>
        <h1 className="blog">{blog.titulo}</h1>

        <p className="blogDesc">{blog.descripcion}</p>
        {chatLoad && <Chat idChat={blog.idChat} />}
      </div>
    );
  }
}

export default BlogDetail;
