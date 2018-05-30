import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InfoCard from './InfoCard.js';

const sampleInfoCard = {
  title: "Card Title", 
  imageLink: "https://www.efilecabinet.com/wp-content/uploads/2017/03/how-work-life-balance-can-be-achieved.jpg",
  affectsWomen: "This is how it affects women", 
  quote: "This is a quote"
}

const infoCards = [sampleInfoCard];

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

        {/* CARDS SECTION BEGINS HERE */}
        <div> 
          {infoCards.map((card) => {
            return (
              <InfoCard 
              {...card}
            />
            )
          })}
        </div> 

      </div>
    );
  }
}

export default App;
