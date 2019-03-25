import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Comentario from "./Comentario"

export class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chat: {},
            comentLoad: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/chats/' + this.props.idChat)
            .then(res => {
                this.setState({ chat: res.data })
                this.setState({ comentLoad: true })
                //console.log(this.state.chat)
            })
    }

    LightenDarkenColor = () => {
        var col = this.state.comentLoad ? this.state.chat.color : "#ffffff"
        var amt = 100
        var usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        var g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return { backgroundColor: (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16) };        
    }



    render() {
        const { chat, comentLoad } = this.state
        return (
            <Fragment>
                <div style={this.LightenDarkenColor()}>
                    <p className="coment" style={{ color: chat.color, textAlign: "center" }}>Comentarios</p>
                    {comentLoad && chat.comentarios.map((comentario, comentarioIndex) => (
                        <Comentario comentario={comentario} key={comentarioIndex}></Comentario>
                    ))}

                </div>

            </Fragment>
        )
    }
}

export default Chat
