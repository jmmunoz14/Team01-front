import React, { Component, Fragment } from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import Blogs from './components/Blog/Blogs'
import Partidas from './components/Partida/Partidas'
import Pregunta from './components/Pregunta/Pregunta'

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

class App extends Component {

  render() {

    return (
      <Router>
        <div className='App'>
          <div className='Toolbar'>
            <Toolbar />
          </div>

          <Route exactm path='/home' render={props => (
            <Fragment>
              <h1>HOME</h1>
            </Fragment>
          )}
          />



          <Route path='/blogs' render={props => (
            <Fragment>
              <Blogs {...props} />
            </Fragment>
          )}
          />

          <Route path='/partidas' render={props => (
            <Fragment>
              <Partidas {...props} />
            </Fragment>
          )}
          />

          <Route exact path='/' render={props => (
            <Fragment>
              <h1>Start Page</h1>
            </Fragment>
          )}
          />
          
          <Route  path='/quiz' render={props => (
            <Fragment>
              <Pregunta/>
            </Fragment>
          )}
          />
            

        </div>

        
                  
        
      </Router>

      
    )
  }
}

export default App
