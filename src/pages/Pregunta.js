import React, { Component} from 'react'
import {origen} from '../helper/config.js'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'


class Pregunta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preguntaas: 
            [
                {id:'',
                materia:'',
                respuesta:''}

            ],
            currentQuestion : 0,
            respuestasCorrectas: 0
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){ 
        fetch (origen+'/api/allquestion')
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            
            return json;
        })
        .then((json) => {
          this.setState({preguntaas:json });

          console.log(json)
          
        });
        
    }

    handleChange(event) 
    {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) 
    {
         if(this.state.value == this.state.preguntaas[this.state.currentQuestion].respuesta)
         {
             this.setState({respuestasCorrectas : this.state.respuestasCorrectas+1})
             
             console.log(this.state.currentQuestion)
             alert('respuesta correcta! \n' + 'Numero de respuestas Correctas = '+ this.state.respuestasCorrectas)
             if(this.state.currentQuestion<this.state.preguntaas.length-1)
             {
                this.setState({currentQuestion : this.state.currentQuestion+1, value : ''})
             }
             else{
                alert('Fin de las preguntas, volviendo a empezar')
                this.setState({currentQuestion : this.state.currentQuestion - this.state.currentQuestion, value : ''})
                this.setState({respuestasCorrectas : this.state.respuestasCorrectas - this.state.respuestasCorrectas , value : ''})
             }
             

         }
         else
         {
            alert('respuesta incorrecta')
            console.log(this.state.preguntaas[this.state.currentQuestion].respuesta)
         }
        event.preventDefault();
    }

    render(){
        return(
            <div className ='todo'>
                <div className = 'quiz'>
                    Quíz
                </div>
            
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Pregunta:</h5>
                        
                        <div className = 'preguntaText'>
                        <p className="card-text">{this.state.preguntaas[this.state.currentQuestion].enunciado}</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                             <p className = 'respuestatext'>Respuesta:</p>
                                <Input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <Button className='boton'>Submit</Button>
                        </form>
                    </div>
                </div>
                 
            </div>
            
        )
    }
}

export default Pregunta;