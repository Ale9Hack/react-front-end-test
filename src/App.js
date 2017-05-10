import React, { Component } from 'react';
import logo from './logo.svg';
import qs from './../node_modules/qs';
import {siteConfig} from './siteconfig';

//Services and Helper
import api from './api';

//Import Component
import Turns from './component/turns'
import Days from './component/days'


import './App.css';
class App extends Component {

constructor(){
  super()
}

//Comunication between component
passDaytoTurn(data){

}

  render() {
    return (
    <section className="App">
    <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {siteConfig.title}</h2>
          <button className='loginSection' type='button'>Login</button>
        </header>
        <main className="App-notice">
          <h3> Ultimas Noticias </h3>
          <p>Content Content Content Content Content Content</p>
        </main>
        <Days passDaytoTurn={(data)=>this.passDaytoTurn(data)}/>
        <Turns  ref={(turns) => { this.turns = turns; }}  />
      </section>
)
}
}

export default App;
