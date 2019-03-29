import React, { Component } from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pregunta from './pages/Pregunta'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/quiz' component={Pregunta}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
