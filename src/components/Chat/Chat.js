import React, { Component, Fragment } from "react";
import axios from "axios";
import Comentario from "./Comentario";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      comentLoad: false,
      nuevoComentario: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/chats/" + this.props.idChat).then(res => {
      this.setState({ chat: res.data });
      this.setState({ comentLoad: true });
      //console.log(this.state.chat)
    });
  }

  postComentario = comentario => {
    const { chat } = this.state;
    chat.comentarios.push({ idUsuario: 100, comentario: comentario });
    var newChat = {
      _id: chat._id,
      color: chat.color,
      enabled: chat.enabled,
      comentarios: chat.comentarios
    };
    console.log(newChat);
    axios.put(`http://localhost:3000/chats/${chat._id}`, newChat).then(res => {
      this.setState({ chat: res.data });
      console.log(res.data);
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  LightenDarkenColor = () => {
    var col = this.state.comentLoad ? this.state.chat.color : "#ffffff";
    var amt = 100;
    var usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return {
      backgroundColor:
        (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
    };
  };

  render() {
    const { chat, comentLoad, nuevoComentario } = this.state;
    return (
      <Fragment>
        <div style={this.LightenDarkenColor()}>
          <hr
            style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }}
          />
          <h1
            className="blog"
            style={{ color: chat.color, textAlign: "center" }}
          >
            Comentarios
          </h1>
          {comentLoad &&
            chat.comentarios.map((comentario, comentarioIndex) => (
              <Comentario comentario={comentario} key={comentarioIndex} />
            ))}
          <hr
            style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }}
          />
          <h1
            className="blog"
            style={{ color: chat.color, textAlign: "center" }}
          >
            Añadir Comentario
          </h1>
          <hr
            style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }}
          />
          <input
            className="coment form-control"
            type="text"
            name="nuevoComentario"
            value={nuevoComentario}
            onChange={this.onChange}
          />
          <button
            className="btn btn-success btn-lg btn-block"
            onClick={() => this.postComentario(nuevoComentario)}
          >
            Añadir Nuevo Comentario
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Chat;
