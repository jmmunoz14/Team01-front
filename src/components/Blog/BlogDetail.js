import React, { Component } from 'react'
import { Link } from "react-router-dom"

export class BlogDetail extends Component {
    render() {
        const {id}=this.props.match.params
        const blog=this.props.blogs.find(blog=>id===blog._id)
        return (
            <div>
                <Link className="btn btn-warning blog" to="/blogs">Return to blogs</Link>
                <h2 className="blog">
                    {blog.titulo}
                </h2>
                <p className="blogDesc">
                    {blog.descripcion}
                </p>
            </div>
        )
    }
}

export default BlogDetail
