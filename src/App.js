import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Toolbar from "./components/Toolbar/Toolbar"
import Blogs from "./components/Blog/Blogs"
import PostBlog from "./components/Blog/PostBlog"
import PutBlog from "./components/Blog/PutBlog"
import BlogDetail from "./components/Blog/BlogDetail"
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      materias: [],
      chats:[]
    }
  }

  
  componentDidMount() {
    axios.get('http://localhost:3000/blogs')
      .then(res => this.setState({ blogs: res.data }))

    axios.get('http://localhost:3000/materias')
      .then(res => this.setState({ materias: res.data }))

    axios.get('http://localhost:3000/chats')
      .then(res => this.setState({ chats: res.data }))
  }

  handlePostBlog = (blog) => {
   //console.log(blog)
    var chat= {
      color: "#e786d1POST",
    enabled: true,
    comentarios: []
  }
    axios.post('http://localhost:3000/chats', chat)
    .then(res => {
      this.setState({ chats: [...this.state.chats, res.data] })
      console.log(this.state.chats.length)
      console.log(this.state.chats[this.state.chats.length-1].chatCreada._id)
      var blognew={
        titulo: blog.titulo,
        descripcion: blog.descripcion,
        idUsuario:blog.idUsuario,
        date:blog.date,
        idChat:this.state.chats[this.state.chats.length-1].chatCreada._id,
        comentarios:[{idUsuario:blog.idUsuario,comentario:"tested"}]
      }
      axios.post('http://localhost:3000/blogs', blognew)
      .then(res => this.setState({ blogs: [...this.state.blogs, res.data] }))
  })

    
  }

  handleDeleteBlog = (id,idChat) => {
    console.log(id)
    axios.delete(`http://localhost:3000/blogs/${id}`)
      .then(res => this.setState({ blogs: [...this.state.blogs.filter(blog => blog._id !== id)] }))

      axios.delete(`http://localhost:3000/chats/${idChat}`)
      .then(res => this.setState({ chats: [...this.state.chats.filter(chat => chat._id !== idChat)] }))
  }

  handlePutBlog = (blog, id) => {
    console.log(id)
    console.log(blog)
    axios.put(`http://localhost:3000/blogs/${id}`, blog)
      .then(res => this.setState({ blogs: [...this.state.blogs.splice(this.state.blogs.indexOf(this.state.blogs.find(blog => blog._id === id)), 1, res.data)] }))
  }
  /*componentWillMount() {
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
          }
          this.setState({ blogs: this.state.blogs.concat([data]) })
        })
      })
  }*/



  render() {
    const { blogs, materias } = this.state
    return (

      <Router>
        <div className="App">

          <div className="Toolbar">
            <Toolbar />
          </div>

          <Route exact path="/blogs" render={props => (
            <Fragment>
              <Blogs blogs={blogs} handleDeleteBlog={(id,idChat) => this.handleDeleteBlog(id,idChat)} />
            </Fragment>
          )} />

          <Route exact path="/blogs/:id" render={props => (
            <Fragment>
              <BlogDetail {...props} />
            </Fragment>
          )} />

          <Route exact path="/blogs/api/post" render={props => (
            <Fragment>
              <PostBlog {...props} materias={materias} handlePostBlog={blog => this.handlePostBlog(blog)}></PostBlog>
            </Fragment>
          )} />

          <Route exact path="/blogs/api/put/:id" render={props => (
            <Fragment>
              <PutBlog {...props} blogs={blogs} materias={materias} handlePutBlog={(blog, id) => this.handlePutBlog(blog, id)} ></PutBlog>
            </Fragment>
          )} />

          <Route exact path="/" render={props => (
            <Fragment>
              <h1>Start Page</h1>
            </Fragment>
          )} />

        </div>
      </Router>
    )
  }
}

export default App
