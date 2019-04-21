import React, { Component, Fragment } from 'react'
import Blog from "./Blog";
import { Link } from "react-router-dom"
import PostBlog from './PostBlog'
import PutBlog from './PutBlog'
import BlogDetail from './BlogDetail'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

export class Blogs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            materias: [],
            chats: [],
            es: true,
            en: true,
            test: "",
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
        console.log(localStorage.getItem("id"))
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
                comentarios: [{ idUsuario: blog.idUsuario, comentario: 'tested' }],
                idioma: blog.idioma
            }
            axios
                .post('http://localhost:3000/blogs', blognew)
                .then(res => {
                    this.setState({ blogs: [...this.state.blogs, res.data] })
                    window.location.reload();
                })
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

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        if (e.target.value === "Any" || e.target.value === "Cualquiera") {
            this.setState({ es: true })
            this.setState({ en: true })
        }
        else if (e.target.value === "Español" || e.target.value === "Spanish") {
            this.setState({ es: true })
            this.setState({ en: false })
        }
        else if (e.target.value === "Inglés" || e.target.value === "English") {
            this.setState({ en: true })
            this.setState({ es: false })
        }
        else {
            this.setState({ en: false })
            this.setState({ es: false })
        }
    };

    render() {
        const { blogs, en, es, test } = this.state
        const { match } = this.props
        return (
            <div style={{ backgroundColor: "white" }}>
                <Route exact path="/blogs" render={props => (
                    <Fragment>
                        <h1 className="blog" style={{ color: '#0069D1' }}>Blogs</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <h2 className="blog" style={{ color: '#0069D1' }}>
                                                <FormattedMessage
                                                    id="Blog.idioma"
                                                    defaultMessage="Idioma:"
                                                />
                                            </h2>
                                        </div>
                                        <div className="col">
                                            <select id="idiomas" onChange={this.onChange} value={test} name="test" className="form-control form-control-lg">
                                                <FormattedMessage id="Blog.cualquiera" defaultMessage="Cualquiera" tagName='option' />
                                                <FormattedMessage id="Blog.es" defaultMessage="es" tagName='option' />
                                                <FormattedMessage id="Blog.en" defaultMessage="en" tagName='option' />
                                            </select>
                                        </div>
                                    </div>
                                    <hr />
                                    <hr />
                                    {es && blogs.filter(blog => blog.idioma === "es").map((blog, blogIndex) => (
                                        <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => this.handleDeleteBlog(blog._id, blog.idChat)} />
                                    ))}
                                    {en && blogs.filter(blog => blog.idioma === "en").map((blog, blogIndex) => (
                                        <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => this.handleDeleteBlog(blog._id, blog.idChat)} />
                                    ))}
                                    {localStorage.getItem("login") === "true" && <Link className="btn btn-success btn-lg btn-block" to="/blogs/api/post">
                                        <p style={{ color: "black" }}>
                                            <FormattedMessage
                                                id="Blog.añadir"
                                                defaultMessage="Añadir Nuevo Blog"
                                            />
                                        </p>
                                    </Link>
                                    }
                                    {localStorage.getItem("login") === "false" && <button disabled={true} className="btn btn-success btn-lg btn-block" to="/blogs/api/post">
                                        <p style={{ color: "black" }}>
                                            <FormattedMessage
                                                id="Blog.añadir"
                                                defaultMessage="Añadir Nuevo Blog"
                                            />
                                        </p>
                                    </button>}

                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
                />

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
            </div>
        )
    }
}

export default Blogs
