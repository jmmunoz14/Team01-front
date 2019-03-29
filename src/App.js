import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Toolbar from './components/Toolbar/Toolbar'
import Blogs from './components/Blog/Blogs'
import Partidas from './components/Partida/Partidas'

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
        </div>
      </Router>
    )
  }
}

export default App
