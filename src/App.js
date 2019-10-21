import React, { Component } from 'react';
import home3 from './component/home3'
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (

      <Switch>
        <Redirect exact from="/" to="/home3"></Redirect>
        <Route path='/home3' component={home3}/>
      </Switch>
    );
  }
}

export default App;