import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div className="imageCard">
          <div className="leftAligned">
            <h1 className="imageTitle">Image Title</h1>
            <img src={"https://www.efilecabinet.com/wp-content/uploads/2017/03/how-work-life-balance-can-be-achieved.jpg"}
                 alt="Image"
                 className="scaledImage"/>
          </div>
          <div className="rightAligned">
            <h4>How it affects women in general</h4>
            <h4>Personal Quotes</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
