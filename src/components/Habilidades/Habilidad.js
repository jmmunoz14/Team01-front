import React, { Component} from 'react'
import {origen} from '../helper/config.js'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'


class Habilidad extends Component {
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

    add (i)
    {
        return i +1;
    }
    
    handleSubmit(event) 
    {
         if(this.state.value == this.state.preguntaas[this.state.currentQuestion].respuesta)
         {
             this.setState( (respuestasCorrectas) => ({respuestasCorrectas:this.state.respuestasCorrectas + 1}),
             () => {alert("Respuesta Correcta! \n numero de respuestas correctas: " + this.state.respuestasCorrectas);})
             
             console.log(this.state.currentQuestion)
             
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
            
<div class="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">

  
  <div class="card">

    
    <div class="card-header" role="tab" id="headingTwo1">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo1"
        aria-expanded="false" aria-controls="collapseTwo1">
        <h5 class="mb-0">
          Angulos <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseTwo1" class="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
      <div class="card-body">
      <img src="protractor.png" className="icons" ></img>
      <h1 className = 'textInside'>En geometría, el ángulo puede ser definido como la parte del plano determinada por dos semirrectas llamadas lados que tienen el mismo punto de origen llamado vértice del ángulo.
La medida de un ángulo es considerada como la longitud del arco de circunferencia centrada en el vértice y delimitada por sus lados. Su medida es un múltiplo de la razón entre la longitud del arco y el radio. 
Su unidad natural es el radián, pero también se puede utilizar el grado sexagesimal o el grado centesimal.</h1>
      </div>
    </div>

  </div>
  

  
  <div class="card">

    
    <div class="card-header" role="tab" id="headingTwo2">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo21"
        aria-expanded="false" aria-controls="collapseTwo21">
        <h5 class="mb-0">
          Derivadas <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseTwo21" class="collapse" role="tabpanel" aria-labelledby="headingTwo21" data-parent="#accordionEx1">
      <div class="card-body">
      <img src="pencil.png" className="icons" ></img>
      <h1 className = 'textInside'>En matemáticas, la derivada de una función mide la rapidez con la que cambia el valor de dicha función matemática, según cambie el valor de su variable independiente. 
      La derivada de una función es un concepto local, es decir, se calcula como el límite de la rapidez de cambio media de la función en cierto intervalo, cuando el intervalo considerado para la variable independiente se torna cada vez más pequeño. 
      Por ello se habla del valor de la derivada de una función en un punto dado.</h1>
      </div>
    </div>

  </div>
  
  <div class="card">

    
    <div class="card-header" role="tab" id="headingThree31">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree31"
        aria-expanded="false" aria-controls="collapseThree31">
        <h5 class="mb-0">
          Desigualdades <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseThree31" class="collapse" role="tabpanel" aria-labelledby="headingThree31" data-parent="#accordionEx1">
      <div class="card-body">
      <img src="desigualdades.png" className="icons" ></img>
      <h1 className = 'textInside'>En matemáticas, una
desigualdad
 es una relación de orden que se da entre dos valores cuando éstos son distintos (en caso de ser iguales, lo que se tiene es una igualdad). 
 Si los valores en cuestión son elementos de un conjunto ordenado, como los enteros o los reales, entonces pueden ser comparados</h1>
      </div>
    </div>

  </div>

  <div class="card">

    
    <div class="card-header" role="tab" id="headingThree41">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree41"
        aria-expanded="false" aria-controls="collapseThree41">
        <h5 class="mb-0">
          Ecuaciones <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseThree41" class="collapse" role="tabpanel" aria-labelledby="headingThree41" data-parent="#accordionEx1">
      <div class="card-body">
        
      </div>
    </div>

  </div>

  <div class="card">

    
    <div class="card-header" role="tab" id="headingThree51">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree51"
        aria-expanded="false" aria-controls="collapseThree51">
        <h5 class="mb-0">
          Ecuaciónes Trigonometricas <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseThree51" class="collapse" role="tabpanel" aria-labelledby="headingThree51" data-parent="#accordionEx1">
      <div class="card-body">
        
      </div>
    </div>

  </div>

  <div class="card">

    
    <div class="card-header" role="tab" id="headingThree61">
      <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree61"
        aria-expanded="false" aria-controls="collapseThree61">
        <h5 class="mb-0">
          Integrales <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    
    <div id="collapseThree61" class="collapse" role="tabpanel" aria-labelledby="headingThree61" data-parent="#accordionEx1">
      <div class="card-body">
        
      </div>
    </div>

  </div>
  

</div>

            
        )
    }
}

export default Habilidad;