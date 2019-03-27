import React, { Component, Fragment } from 'react'
import Blog from "./Blog";
import { Link } from "react-router-dom"

export class Blogs extends Component {

    render() {
        const { blogs, handleDeleteBlog } = this.props
        return (
            <Fragment>
                <h1 className="blog">Blogs</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {blogs.map((blog, blogIndex) => (
                                <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => handleDeleteBlog(blog._id, blog.idChat)} />))}
                            <Link className="btn btn-success btn-lg btn-block" to="/blogs/api/post">Añadir Nuevo Blog</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Blogs
