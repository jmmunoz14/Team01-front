import React, { Component } from "react";
import Toolbar from "./components/Toolbar/Toolbar";
import Blog from "./components/Blog/Blog";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    };
  }

  componentWillMount() {
    fetch("http://localhost:3000/blogs")
      .then(response => response.json())
      .then(blogs => {
        blogs.forEach(blog => {
          let data = {
            _id: blog._id,
            idUsuario: blog.idUsuario,
            idMaterias: blog.idMaterias,
            idHabilidades: blog.idHabilidades,
            titulo: blog.titulo,
            descripcion: blog.descripcion,
            chat: blog.chat
          };
          this.setState({ blogs: this.state.blogs.concat([data]) });
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="Toolbar">
          <Toolbar />
        </div>
        <div className="Blogs">
          {this.state.blogs.map((blog, blogIndex) => (
            <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
