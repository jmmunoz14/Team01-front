import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
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
      <Router>
        <div className="App">
          <div className="Toolbar">
            <Toolbar />
          </div>
          <Route exact path="/blogs" render={props => (

            <React.Fragment>

              <div className="Blogs">
                {this.state.blogs.map((blog, blogIndex) => (
                  <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} />
                ))}
              </div>
            </React.Fragment>
          )} />

          <Route exact path="/" render={props => (
            <React.Fragment>
              <h1>Start Page</h1>
            </React.Fragment>
          )}/>

        </div>
      </Router>
        );
      }
    }
    
    export default App;
