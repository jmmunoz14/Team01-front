import React, { Component } from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pregunta from './pages/Pregunta'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Pregunta}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
