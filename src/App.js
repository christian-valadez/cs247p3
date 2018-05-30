import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div class="container">
            Testing container 
          </div> 

          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>

      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
