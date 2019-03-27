import React, { Component, Fragment } from 'react'
import Blog from "./Blog";
import { Link } from "react-router-dom"
import PostBlog from './PostBlog'
import PutBlog from './PutBlog'
import BlogDetail from './BlogDetail'
import axios from 'axios'
import { Route } from 'react-router-dom'

export class Blogs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            materias: [],
            chats: [],
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3000/blogs')
            .then(res => this.setState({ blogs: res.data }))

        axios
            .get('http://localhost:3000/chats')
            .then(res => this.setState({ chats: res.data }))
    }

    handlePostBlog = blog => {
        // console.log(blog)
        var chat = {
            color: '#e786d1POST',
            enabled: true,
            comentarios: []
        }
        axios.post('http://localhost:3000/chats', chat).then(res => {
            this.setState({ chats: [...this.state.chats, res.data] })
            var blognew = {
                titulo: blog.titulo,
                descripcion: blog.descripcion,
                idUsuario: blog.idUsuario,
                date: blog.date,
                idChat: this.state.chats[this.state.chats.length - 1].chatCreada._id,
                comentarios: [{ idUsuario: blog.idUsuario, comentario: 'tested' }]
            }
            axios
                .post('http://localhost:3000/blogs', blognew)
                .then(res => this.setState({ blogs: [...this.state.blogs, res.data] }))
        })
    }

    handleDeleteBlog = (id, idChat) => {
        console.log(id)
        axios.delete(`http://localhost:3000/blogs/${id}`).then(res =>
            this.setState({
                blogs: [...this.state.blogs.filter(blog => blog._id !== id)]
            })
        )

        axios.delete(`http://localhost:3000/chats/${idChat}`).then(res =>
            this.setState({
                chats: [...this.state.chats.filter(chat => chat._id !== idChat)]
            })
        )
    }

    handlePutBlog = (blog, id) => {
        const { blogs } = this.state
        axios.put(`http://localhost:3000/blogs/${id}`, blog).then(res =>
            this.setState({ blogs: [...blogs.splice(blogs.indexOf(blogs.find(blog => blog._id === id)), 1, res.data)] })
        )
    }

    render() {
        const { blogs } = this.state
        const { match } = this.props
        return (
            <Fragment>
                <h1 className="blog">Blogs</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {blogs.map((blog, blogIndex) => (
                                <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => this.handleDeleteBlog(blog._id, blog.idChat)} />))}
                            <Link className="btn btn-success btn-lg btn-block" to="/blogs/api/post">Añadir Nuevo Blog</Link>
                        </div>
                    </div>
                </div>
                <Route exact path={`${match.path}/:id`} render={props => (
                    <Fragment>
                        <BlogDetail {...props} />
                    </Fragment>
                )}
                />

                <Route exact path='/blogs/api/post' render={props => (
                    <Fragment>
                        <PostBlog {...props} handlePostBlog={blog => this.handlePostBlog(blog)} />
                    </Fragment>
                )}
                />

                <Route exact path='/blogs/api/put/:id' render={props => (
                    <Fragment>
                        <PutBlog {...props} handlePutBlog={(blog, id) => this.handlePutBlog(blog, id)} />
                    </Fragment>
                )}
                />
            </Fragment>
        )
    }
}

export default Blogs
