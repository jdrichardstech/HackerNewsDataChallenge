import React, { Component } from 'react';	
import './App.css';
import { StoriesList } from './components/containers'

class App extends Component {
  render() {
    return (
      <div className="App">
       <StoriesList />
      </div>
    );
  }
}

export default App;
