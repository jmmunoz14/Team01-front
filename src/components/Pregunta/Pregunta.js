import React, { Component } from 'react'
import { origen } from '../helper/config.js'

class Pregunta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preguntaas:
                [
                    {
                        id: '',
                        materia: '',
                        respuesta: '',
                        
                    }

                ],
            currentQuestion: 0,
            

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        fetch(origen + '/api/allquestion')
            .then((response) => {
                return response.json()
            })
            .then((json) => {

                return json;
            })
            .then((json) => {
                this.setState({ preguntaas: json });

                console.log(json)

            });

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.value === this.state.preguntaas[this.state.currentQuestion].respuesta) {
            alert('respuesta correcta')
            console.log(this.state.preguntaas[this.state.currentQuestion].respuesta)
            this.setState({ currentQuestion: this.state.currentQuestion + 1 })
        }
        else {
            alert('respuesta incorrecta')
            console.log(this.state.preguntaas[this.state.currentQuestion].respuesta)
        }
        event.preventDefault();
    }

    render() {
        return (
            <main>
                <div>
                    <div className='quiz'>
                        Quíz
                </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pregunta:</h5>

                            <div className='preguntaText'>
                                <p className="card-text">{this.state.preguntaas[this.state.currentQuestion].enunciado}</p>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <p>Respuesta:</p>
                                    <input name="res" type="text" required value={this.state.value || ''} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>



                </div>
            </main>
        )
    }
}

export default Pregunta;