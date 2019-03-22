import React, { Component } from "react";

export default class Blog extends Component {

    render(){
        return(          
        <div className="blog">
        <h1>{this.props.blog.titulo}</h1>
        <h3>{this.props.blogIndex}</h3>
      </div>  
        );
    }
}
